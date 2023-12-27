// "use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ToastContainer } from "react-toastify";
import Editbrand from "../Brand/edit-brand";
import DeleteModuleB from "../Brand/deleteMudule";
import CreateBrand from "../Brand/create-brand";
import Pagination from "../../UserModule/Pagination";

const brandlist = () => {
  const [getallBrand, setGetallBrand] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [brandID, setBrandID] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState([]);
  const [brandEdit, setBrandEdit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingBtn, setLoadingBtn] = useState(false);

  const openDrawerO = async (_id) => {
    setBrandEdit(_id);
    try {
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/brand/getBrand",

        data: {
          id: _id,
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        setEditData(response?.data);
        setIsDrawerOpenO(true);
      } else {
        console.error("Error: Unexpected response status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closeDrawerO = () => {
    setIsDrawerOpenO(false);
  };
  function closeModal() {
    setOpenDelete(false);
  }

  function openModal(id) {
    setBrandID(id);
    setOpenDelete(true);
  }
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  console.log(selected);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = getallBrand?.map((n) => n?._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  useEffect(() => {
    defaultBrand();
  }, [isRefresh]);

  const pageLimit = 10;
  const defaultBrand = async (page, limit) => {
    setLoadingBtn(true);
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/brand/getallBrand",
      params: {
        page: page,
        limit: limit,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setGetallBrand(response.data);
        setTotalPages(response?.data?.totalPages || 1);

        console.log("dddd", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    defaultBrand(currentPage, pageLimit);
  }, [currentPage]);

  // -------------search product----------
  const handleSearch = (e) => {
    const search = e.target.value;
    if (e.target.value !== "") {
      const option = {
        method: "GET",
        url: `http://e-commerce-backend-brown.vercel.app/api/brand/getallBrand?search=${e.target.value}`,
      };
      axios
        .request(option)
        .then(function (response) {
          if (response.status === 200) {
            setGetallBrand(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      defaultBrand();
    }
  };

  const allDelete = async () => {
    try {
      console.log(isChecked);
      const response = await axios.post(
        `https://e-commerce-backend-brown.vercel.app/api/brand/deleteBulkBrands`,
        { brandIds: selected }
      );

      if (response.status === 200) {
        console.log("Successfully deleted brands");
        refreshData();
        defaultBrand();
      } else {
        console.error(
          "Failed to delete brands. Status code: " + response.status
        );
      }
    } catch (error) {
      console.error("Error deleting brands:", error);
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (value === "selectAll") {
      setSelectAll(checked);
      if (checked) {
        const allItemIds = getallBrand.map((item) => item._id);
        setisChecked(allItemIds);
      } else {
        setisChecked([]);
      }
    } else {
      if (checked) {
        setisChecked([...isChecked, value]);
      } else {
        setisChecked(isChecked.filter((id) => id !== value));
      }
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const EnhancedTableToolbar = ({ numLength }) => {
    return (
      <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg h-[100px] bg-lightBlue-100 mt-5">
        <h2 className="text-lg font-medium ">{numLength} Product selected</h2>
        <button
          onClick={allDelete}
          className="border border-1 rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200 py-2 px-4 hover:border-none"
        >
          Delete All
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="px-3 lg:px-0"></div>
      <ToastContainer />
      <div className="flex justify-between items-center 2xl:pt-4 2xl:px-10 mt-2 border border-[#f3f3f3] rounded-lg bg-white 2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[45px] h-[45px]  xl:px-8 lg:px-5 md:px-4 sm:px-4 px-4 2xl:text-2xl xl:text-[18px] lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]">
        <h2 className="font-semibold">Brand List </h2>

        <div className="flex items-center w-[40%]">
          <input
            type="search"
            className=" border border-gray-500 p-[2px] lg:p-[4px] 2xl:p-3 rounded-lg  w-11/12 focus:outline-none "
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
            onChange={handleSearch}
          />
        </div>
        <h2>Welcome Back, Admin</h2>
      </div>

      {selected?.length > 0 ? (
        <EnhancedTableToolbar numLength={selected?.length} />
      ) : (
        <div className=" flex justify-end  items-center 2xl:px-10 xl:px-8 lg:px-5 md:px-4 sm:px-3 px-2 border border-[#f3f3f3] rounded-lg bg-white w-full 2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[45px] lg:mt-5 sm:mt-3 mt-2 h-[45px]">
          <div className="">
            <Link href="/create-brand"></Link>
            <button
              onClick={openDrawer}
              className=" rounded-md my-auto bg-lightBlue-600 text-white cursor-pointer 2xl:p-3  2xl:text-[18px] xl:p-2 xl:text-[14px] lg:p-[6px] lg:text-[12px] md:text-[10px] md:p-1 sm:text-[10px] sm:p-1 p-[3px] text-[10px]"
            >
              + Add Brand
            </button>
          </div>
        </div>
      )}
      {isDrawerOpen && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[50%] lg:h-[45%] lg:w-4/12 w-6/12  p-4 overflow-y-auto  transition-transform -translate-x-0 bg-white    border rounded-lg"
          tabIndex={-1}
          aria-labelledby="drawer-form-label"
        >
          <button
            type="button"
            onClick={closeDrawer}
            className="text-gray-400  shadow-2xl text-sm lg:w-14  top-2  inline-flex items-center justify-center "
          >
            <svg
              className="2xl:w-9 2xl:h-9 xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-6  sm:h-6 w-5 h-5 bg-white border  rounded-lg p-1 hover:bg-orange-100 hover:text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <ArrowRightIcon className="w-12 h-12 bg-white border rounded-xl p-1  text-orange-700 hover:bg-orange-100 hover:text-black" />
            </svg>
            <span className="sr-only bg-black">Close menu</span>
          </button>
          <div className="">
            <CreateBrand closeDrawer={closeDrawer} refreshData={refreshData} />
          </div>
        </div>
      )}
      {isDrawerOpenO && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[50%] lg:h-[45%] lg:w-4/12 w-6/12 p-4 overflow-y-auto transition-transform -translate-x-0 bg-white "
          tabIndex={-1}
          aria-labelledby="drawer-form-label"
        >
          <button
            type="button"
            onClick={closeDrawerO}
            className="text-gray-400  shadow-2xl text-sm lg:w-14  top-2  inline-flex items-center justify-center "
          >
            <svg
              className="2xl:w-9 2xl:h-9 xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-6  sm:h-6 w-5 h-5 bg-white border  rounded-lg p-1 hover:bg-orange-100 hover:text-black"
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
            <Editbrand
              closeDrawer={closeDrawerO}
              refreshData={refreshData}
              editData={editData}
              brandEdit={brandEdit}
            />
          </div>
        </div>
      )}
      <table className="table-auto bg-white rounded-md mt-5  relative w-full lg:w-8/12 xl:w-8/12">
        <thead className="">
          <tr
            className="bg-coolGray-200 text-gray-400 text-start flex w-full 
          2xl:text-[20px] 
          xl:text-[14px]
           lg:text-[12px] 
           md:text-[12px] 
           sm:text-[12px] 
           text-[10px]"
          >
            <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-2/12">
              <input
                type="checkbox"
                className="mx-3  cursor-pointer "
                onChange={handleSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </th>
            <th className="text-start my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 w-4/12 ">
              NAME
            </th>
            <th className="text-start my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 w-3/12 ">
              PUBLISHED
            </th>
            <th className="text-start my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 w-3/12 ">
              ACTION
            </th>
          </tr>
        </thead>
        {getallBrand.map((items, index) => {
          const isItemSelected = isSelected(items?._id);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <tbody>
              <tr className="text-start flex w-full 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[14px] sm:text-[13px] text-[10px]">
                <td
                  className="mx-5 my-auto w-2/12"
                  role="checkbox"
                  onClick={(event) => handleClick(event, items?._id)}
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <input
                    type="checkbox"
                    className="mx-3 mt-5 cursor-pointer "
                    value={items?._id}
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </td>
                <td className=" my-auto w-4/12">
                  {" "}
                  {items?.brand ? items?.brand : "-"}
                </td>
                <td className=" my-auto w-3/12">
                  <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                    selling
                  </p>
                </td>

                <td className="w-3/12 ">
                  <div className="flex my-3">
                    {/* <button className="flex">
                      <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500 m-2" />
                    </button> */}
                    <button onClick={() => openDrawerO(items?._id)}>
                      <PencilSquareIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5  text-lightBlue-600 m-2 " />
                    </button>

                    <button
                      type="button"
                      onClick={() => openModal(items?._id)}
                      className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <TrashIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5 text-red-800" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    Are You Sure! Want to Delete?
                  </Dialog.Title>
                  <DeleteModuleB
                    brandID={brandID}
                    closeModal={closeModal}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default dynamic(() => Promise.resolve(brandlist), { ssr: false });
