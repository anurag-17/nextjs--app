import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductAddForm = ({ name, handleInput }) => {

    const [allSizes, setAllSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleCheckboxChange = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter((s) => s !== size));
            handleInput({value:selectedSizes})
        } else {
            setSelectedSizes([...selectedSizes, size]);
            handleInput({value:selectedSizes})
        }
    };

    useEffect(() => {
        defaultCategory();
    }, []);


    const defaultCategory = () => {

        const options = {
            method: "GET",
            url: "https://e-commerce-backend-brown.vercel.app/api/chart/getAllSizeCharts",
        };

        axios
            .request(options)
            .then((response) => {
                setAllSizes(response?.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    return (
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label htmlFor="" className="custom-input-label">
                Product Sizes
            </label>
            <div className="col-span-8 sm:col-span-4 flex gap-x-8">
                {allSizes?.map((size) => (
                    <div className="">
                        {
                            size?.sizeChart?.map((items) => (

                                <div key={size?._id} className="flex gap-x-5">
                                    <input
                                        type="checkbox"
                                        name={name}
                                        id={items?._id}
                                        checked={selectedSizes.includes(items?.size)}
                                        onChange={() => handleCheckboxChange(items?.size)}
                                        className="text-[20px]"
                                        required
                                    />
                                    <label htmlFor={items._id} className="text-[20px]" >{items?.size}</label>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ProductAddForm;
