import { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../utlis/config";
import CreateSizes from "./createSizes";

import {
    MagnifyingGlassPlusIcon,
    TrashIcon,
    PencilSquareIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import WebsiteLoader from "../../websiteLoader";
import axios from "axios";
import { ToastContainer } from "react-toastify";


// components/SizeChart.js
const SizeChart = () => {

    const headItems = ["SIZE", "chest", "waist","hips", "sleeveLength", "shoulderWidth"];
    const [sizeChart, setSizeChart] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefresh, setRefresh] = useState(false);
    const [isLoadingBtn, setLoadingBtn] = useState(false);
    const [allSizes, setAllSizes] = useState([]);


    const openDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };


    const refreshData = () => {
        setRefresh(!isRefresh);
    };


    useEffect(() => {
        defaultCategory();
    }, [isRefresh]);


    const defaultCategory = () => {
        setLoadingBtn(true)
        const options = {
            method: "GET",
            url: "https://e-commerce-backend-brown.vercel.app/api/chart/getAllSizeCharts",
        };

        axios
            .request(options)
            .then((response) => {
                setAllSizes(response?.data);
                setLoadingBtn(false)
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoadingBtn(false)
            });
    };



    return (
        <>
            <ToastContainer />
            {
                isLoadingBtn &&
                <WebsiteLoader />
            }
            <div>

                <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
                    <h2 className="text-2xl font-semibold pb-4">Size chart </h2>

                    <h2>Welcome Back, Admin</h2>
                </div>

                <div className="flex justify-end items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
                    <div className="flex justify-around">
                        <button
                            onClick={openDrawer}
                            className=" rounded-md p-2 bg-lightBlue-600 text-white cursor-pointer mr-4"
                        >
                            + Add new size
                        </button>
                    </div>
                </div>


                {isDrawerOpen && (
                    <div
                        id="drawer-form"
                        className="fixed content-center mb-5 right-5 z-40 h-[700px] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-4/12  "
                        tabIndex={-1}
                        aria-labelledby="drawer-form-label"
                    >
                        <button
                            type="button"
                            onClick={closeDrawer}
                            className="text-gray-400  shadow-2xl text-sm w-14  top-2  inline-flex items-center justify-center "
                        >
                            <svg
                                className="w-9 h-9 bg-white border  rounded-lg p-1 hover:bg-orange-100 hover:text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <ArrowRightIcon className="w-12 h-12 bg-white border rounded-xl p-1  text-orange-700 hover:bg-orange-100 hover:text-black" />
                            </svg>
                            <span className="sr-only bg-black">Close menu</span>
                        </button>
                        <div>
                            <CreateSizes
                                closeDrawer={closeDrawer}
                                refreshData={refreshData}
                            />
                        </div>
                    </div>
                )}

                <table className="table-auto bg-white rounded-md mt-5 w-[90%]  relative  text-center px-4">
                    <thead className="">
                        <tr className="bg-coolGray-200 px-5 text-gray-400 text-sm text-start flex justify-between items-center ">
                            {headItems.map((items, inx) => (
                                <th className="capitalize text-start py-5 text-[14px] font-medium w-[200px] " key={inx}>
                                    {items}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSizes?.length > 0 && allSizes?.map((items, index) => (
                                <tr
                                    className="flex justify-between cursor-pointer"
                                    key={index}
                                >
                                    {console.log(items)}
                                    {
                                        items?.sizeChart.map((data, inx) => (
                                            <Fragment key={inx}>
                                                <td className="py-5 pr-3 w-[200px] text-left pl-3 text-[18px]">
                                                    {data?.size ? data?.size : "-"}
                                                </td>
                                                <td className="py-5 pr-3 w-[200px] text-left text-[18px] ">
                                                    {data?.measurements?.chest.value} {data?.measurements?.chest?.unit}
                                                </td>
                                                <td className="py-5 pr-3 w-[200px] text-left  text-[18px] ">
                                                    {data?.measurements?.waist.value} {data?.measurements?.chest?.unit}
                                                </td>
                                                <td className="py-5 pr-3 w-[200px] text-left  text-[18px] ">
                                                    {data?.measurements?.hips.value} {data?.measurements?.chest?.unit}
                                                </td>
                                                <td className="py-5 pr-3 w-[200px] text-left  text-[18px] ">
                                                    {data?.measurements?.sleeveLength.value} {data?.measurements?.chest?.unit}
                                                </td>
                                                <td className="py-5 pr-3 w-[200px] text-left  text-[18px] ">
                                                    {data?.measurements?.shoulderWidth.value} {data?.measurements?.chest?.unit}
                                                </td>
                                            </Fragment>
                                        ))
                                    }

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SizeChart;
