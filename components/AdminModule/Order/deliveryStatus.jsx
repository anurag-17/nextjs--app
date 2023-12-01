import React, { useState } from "react";

const DeliveryStatus = ({ statusItems, closeModal }) => {

    const [deliveryStatus, setDeliveryStatus] = useState("Not Processed");


    const hideModal = () => {
        closeModal()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(deliveryStatus)
    }

    return (
        <>
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


                <button type="button" onClick={hideModal}
                    className=" text-cyan-600 py-2 px-5 rounded text-center bg-white mb-2 font-semibold text-[15px]">Cancel</button>
                <button type="submit" className=" bg-cyan-600 py-2 px-5 ml-4 rounded text-center text-white mb-2 font-semibold text-[15px]">Submit</button>
            </form>
        </>
    )
};

export default DeliveryStatus;
