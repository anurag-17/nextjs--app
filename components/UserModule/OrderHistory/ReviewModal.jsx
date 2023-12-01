import axios from "axios";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RatingStars from "./Rating Stars";

const ReviewPopup = ({ closeModal, ratingProd }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);

  const { token } = useSelector((state) => state.auth?.userDetails || "");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/rating",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        authorization: token,
      },
      data: {
        star: rating,
        prodId: ratingProd?._id,
        comment: comment,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          setComment("");
          setRating("");
          closeModal();
        } else {
            toast.error("Not purches the product yet");
          return;
        }
      })
      .catch(function (error) {
        toast.error("Not purches the product yet");
        console.error(error);
      });
  };

  return (
    <>
      <div className="py-4 mt-2 relative">
        <div className="absolute right-[15px] top-[10px]">
            {/* <Image src="/svg/close.svg" alt="close" height="24" width="24" /> */}
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-5 gap-y-3">
          <div className="flex flex-row-reverse justify-between">
            <div className="">
              <h5 className="text-[20px] font-medium ">
                {ratingProd?.product.title}
              </h5>
              <p className="text-[16px] font-medium  text-gray">{ratingProd?.color}</p>
            </div>
            <div className="">
              <h5 className="text-[22px] font-medium ">Rate this product</h5>

              <RatingStars
                initialRating={rating}
                onRatingChange={handleRatingChange}
              />
            </div>
            </div>

            <div className="bg-[#f3f3f3] h-[1px] w-full my-5"></div>

            <h5 className="text-[20px] font-medium ">Review this product</h5>
            <div className=" flex flex-col gap-3">
              <label htmlFor="" className="font0medium">
                Comment
              </label>
              <textarea
                type="text"
                name="comment"
                placeholder="Comment"
                className="custom-input h-[100px]"
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-8 text-right flex justify-end gap-x-5" >
            <button
              type="button"
              onClick={closeModal}
              className="px-6  py-2 rounded-md border text-lightBlue-600 bg-white flex justify-center text-[18px] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6  py-2 rounded-md border bg-lightBlue-600 text-white flex justify-center text-[18px] font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewPopup;
