import axios from "axios";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../redux/slices/authSlice";


const AddressModal = ({closeModal,userAdd}) => {

    const dispatch = useDispatch();
    const [address, setAddress] = useState("")
    const {token} = useSelector((state)=>state.auth?.userDetails || "")

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const options = {
          method: "PUT",
          url: "https://e-commerce-backend-brown.vercel.app/api/auth/save-address",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "insomnia/2023.5.8",
            "authorization":  token,
          },
          data: {
            address : address
          },
        };
    
        axios
          .request(options)
          .then(function (response) {
            if (response.status === 200) {
              toast.success("Address updated successfully!");
              dispatch(setUserDetails(response?.data));
              closeModal()
            } else {
              return;
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      };

  return (
    <>
    <div className="py-4 mt-2">
        <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-5">
                <textarea
                    type="text"
                    name="color"
                    placeholder="Enter your address (Area and Street)"
                    className="custom-input h-[100px]"
                    onChange={(e)=>setAddress(e.target.value)}
                    defaultValue={userAdd ? userAdd : address }
                    required
                ></textarea>
            </div>
           <div className="mt-2 text-right">
           <button type="submit" className="px-4 py-2 rounded border bg-lightBlue-600 text-white flex justify-center text-[18px] ml-auto font-semibold"> Save</button>
           </div>
        </form>
    </div>
    </>
  )
};

export default AddressModal;
