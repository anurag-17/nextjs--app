import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utlis/config";

const DeliveryStatus = ({ statusItems, closeModal, refreshData , statusId}) => {

    const [deliveryStatus, setDeliveryStatus] = useState("Not Processed");
    const [isLoading, setLoading] = useState(false);
    const { auth_token } = useSelector((state) => state.adminAuth || null);

    const hideModal = () => {
        closeModal()
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(deliveryStatus)
    
        try {
          const response = await axios.put(
            `${BASE_URL}/auth/order/update-order`,
  {
            status : deliveryStatus || "Not Processed",
            id:statusId || ""
            },
            {
              headers: {
                "Content-Type": "application/json",
                authorization: auth_token,
              },
            }
          );
    
          console.log(response);
    
          if (response.status === 200) {
            toast.success("Status Updated successfully !");
            setLoading(false);
            hideModal();
            refreshData();
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      };

    return (
        <>
          <div className="py-[20px]">
          <form onSubmit={handleSubmit}>
                <select
                    type="text"
                    className="custom-input my-4 text-black"
                    value={deliveryStatus}
                    onChange={(e) => setDeliveryStatus(e.target.value)}
                    required
                >
                    {statusItems.map((items, index) => (
                        <option
                            key={index}
                            value={items}
                            className="text-black py-2"
                            selected={items === deliveryStatus}
                        >
                            {items}
                        </option>
                    ))}
                </select>


              <div className="flex justify-end gap-x-5 mt-[10px]">
              <button type="button" onClick={hideModal}
                    className=" text-cyan-600 py-2 px-5 rounded text-center bg-white mb-2 font-semibold text-[15px] border border-[#0891b2">Cancel</button>
                <button type="submit" disabled={isLoading} className=" bg-cyan-600 py-2 px-5 rounded text-center text-white mb-2 font-semibold text-[15px]"> { isLoading ? "Loading" : "Submit" }</button>
              </div>
            </form>
          </div>
        </>
    )
};

export default DeliveryStatus;
