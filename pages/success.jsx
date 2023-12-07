import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = () => {
    return (
        <div className="py-[100px]">
            <div className="container mx-auto">
                <div className="flex flex-col justify-center items-center gap-14 bg-lightBlue-50 w-[60%] h-[80vh]">
                    <Image src="/images/payment_success.jpg" alt="payment success" width={800} height={500} />
                    <div className="flex flex-col justify-center items-center gap-5">
                        <p className="text-[30px] font-semibold text-lightBlue-700 "> Payment successfull !!</p>
                        <Link href="/">
                            <p className="text-[18px] font-medium text-white bg-black px-8 py-2 rounded-md cursor-pointer flex  justify-center">
                                Continue shopping
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Success;
