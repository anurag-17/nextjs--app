import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../utlis/config";
import { useSelector } from "react-redux";


const CreateSizes = ({ closeDrawer, refreshData }) => {

    const sizeFigure = ["XS", "s", "M", "L", "XL", "XXL"]
    const [size, setSize] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { auth_token } = useSelector((state) => state.adminAuth || null);
    const [formData, setFormData] = useState({
        units: '',
        chest: '',
        waist: '',
        hips: '',
        sleeveLength: '',
        shoulderWidth: '',
    });
    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    console.log(size)


    const handleSave = async (e) => {

        e.preventDefault();
        setLoading(true)
        const body = JSON.stringify({
            sizeChart: [
                {
                    size: size,
                    measurements: {
                        chest: {
                            unit: 'inches',
                            value: parseFloat(formData.chest),
                        },
                        waist: {
                            unit: 'inches',
                            value: parseFloat(formData.waist),
                        },
                        hips: {
                            unit: 'inches',
                            value: parseFloat(formData.hips),
                        },
                        sleeveLength: {
                            unit: 'inches',
                            value: parseFloat(formData.sleeveLength),
                        },
                        shoulderWidth: {
                            unit: 'inches',
                            value: parseFloat(formData.shoulderWidth),
                        },
                    },
                },
            ],
        })
        try {
            const response = await axios.post(
                `${BASE_URL}/chart/createSizeChart`,
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": auth_token,
                    },
                }
            );
            if (response.status === 201
            ) {
                toast.success("Size created successfully !");
                setLoading(false);
                closeDrawer()
                refreshData()
                setFormData({
                    units: '',
                    chest: '',
                    waist: '',
                    hips: '',
                    sleeveLength: '',
                    shoulderWidth: '',
                })
            } else {
                setLoading(false);
            }
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };



    return (
        <div>
            <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] mt-5 ">
                <h2 className="text-2xl font-semibold pb-4">Add new size </h2>
            </div>

            <form onSubmit={handleSave}>
                <div className="size-section">
                    <div className="w-full">
                        <select
                            placeholder="Add Category"
                            className="px-3 py-2 rounded m-10 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] elative w-8/12 text-black"
                            onChange={(e) => setSize(e.target.value)}
                            required
                        >
                            <option value="" >
                                choose category
                            </option>
                            {sizeFigure?.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                    selected={item === size}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="measurement-field">
                        <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800capitalize ">Units:</label>
                        <input
                            type="text"
                            name="units"
                            className="px-3 py-2 rounded mx-10 my-4 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] relative w-8/12 text-black"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="measurement-field">
                        <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800  capitalize">Chest:</label>
                        <input
                            type="number" name="chest"
                            className="px-3 py-2 rounded mx-10 my-4 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] relative w-8/12 text-black"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="measurement-field">
                        <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800 capitalize">waist:</label>
                        <input
                            type="number"
                            name="waist"
                            className="px-3 py-2 rounded mx-10 my-4 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] relative w-8/12 text-black"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="measurement-field">
                        <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800 capitalize ">hips:</label>
                        <input
                            type="number"
                            name="hips"
                            className="px-3 py-2 rounded mx-10 my-4 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] relative w-8/12 text-black"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="measurement-field">
                        <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800 capitalize ">sleeve Length:</label>
                        <input
                            type="number"
                            name="sleeveLength"
                            className="px-3 py-2 rounded mx-10 my-4 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] relative w-8/12 text-black"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="measurement-field">
                        <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800 capitalize ">shoulder Width:</label>
                        <input
                            type="number"
                            name="shoulderWidth"
                            className="px-3 py-2 rounded mx-10 my-4 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] relative w-8/12 text-black"
                            onChange={inputHandler}
                        />
                    </div>
                    {/* Repeat similar input fields for other measurements */}
                </div>
                <div className="my-6">
                    <button
                        type="submit"
                        className="border py-2 px-6 mx-10 rounded-md bg-lightBlue-600 text-white text-[20px] "
                    >
                        {isLoading ? "Loading.." : "Add"}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CreateSizes;
