import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DeleteModal = ({ productID,closeModal,refreshData }) => {

  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    closeModal();
    refreshData();
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "DELETE",
      url: `https://e-commerce-backend-brown.vercel.app/api/product/deleteProduct/${productID}`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        // Authorization: "Bearer " + token,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Product deleted successfully !");
          handleClose();
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. something went wrong!");
      });
  };

  return (
    <>
    {/* <ToastContainer/> */}
      <div className="mt-2">
        <p className="lg:text-[18px] text-[16px] font-normal leading-[30px] text-gray-500 mt-4">
          Do you really want to delete these records? You cant't view this in
          your list anymore if you delete!
        </p>
      </div>

      <div className="mt-8">
        <div className="flex justify-between gap-x-5">
          <button
            className="w-full border border-1 rounded-md border-lightBlue-400 text-lightBlue-700 hover:bg-lightBlue-200 text-sm  px-2 py-3
                              hover:border-none"
                              onClick={handleClose}
          >
            No, Keep It
          </button>
          {
            isLoading ? 
            <button
            className="w-full border border-1 rounded-md 
                              text-sm 
                              border-red-400 text-red-700 bg-red-200  px-2 py-3
                              hover:border-none"
          >
        Loading...
          </button>
            :
          <button
            // onClick={productDelete(id)}
            className="w-full border border-1 rounded-md 
                              text-sm 
                              border-red-400 text-red-700 hover:bg-red-200  px-2 py-3
                              hover:border-none"
            onClick={handleDelete}
          >
            Yes, Delete It
          </button>
          }
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
