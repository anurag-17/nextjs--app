import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const ProductCart = () => {
  return (
    <>
      <section>
        <div className="flex-[2] flex flex-col items-center justify-center h-[100vh] pb-[50px] md:-mt-14">
          <Image
            src="/images/empty-cart.jpg"
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
          />
          <span className="text-xl font-bold mt-5 ">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anything in your cart.
            <br />
            Go ahead and explore top categories.
          </span>
          <Link
            href="/product-grid"
            className="py-4 px-8 rounded-full bg-lightBlue-600 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCart), { ssr: false });