"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { loadStripe } from '@stripe/stripe-js';
import { BASE_URL } from "../../utlis/config";
import { useSelector } from "react-redux";


const Payment = ({ buyItem, grandTotal, orderShipDetails }) => {


    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const totalNum = grandTotal * 100
    const orderProduct = { ...buyItem, grandTotal: totalNum };
    console.log(orderProduct)
    const { token } = useSelector((state) => state.auth.userDetails || {});

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51OKcgkSJ2F7IxeZbLXWbBhZfKArpWwTdsmMfJGOVK7jrYc2cKYoF5iXF9erVGCrLv0BDjUMeqIsMYuzXIS3sYLev00NZ0MYGLF");

        const data = {
            COD: false,
            // products : orderProduct
        }
        const headers = {
            "Content-Type": "application/json",
            authorization: token,
        }
        const response = await fetch(`${BASE_URL}/auth/cart/cash-order`, {
            method: "POST",
            headers: headers,

            body: JSON.stringify(data)
        });

        console.log(response)
        if (response.status === 200) {
            const session = await response.json();

            const result = stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.log(result.error);
            }
        } else {
            return;
        }
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="flex flex-col items-end justify-end mt-[30px]">
                    <button
                        onClick={makePayment}
                        disabled={isLoading}
                        className={`px-5 py-2 rounded bg-lightBlue-700 text-white font-semibold hover:bg-lightBlue-600 w-full md:w-[300px] ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? "Processing..." : "Checkout"}
                    </button>
                </div>
            </Suspense>
        </>
    );
};

export default Payment;
