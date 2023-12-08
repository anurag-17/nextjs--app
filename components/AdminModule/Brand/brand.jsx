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

const headItems = ["NAME", "PUBLISHED", "ACTION"];
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

  const pageLimit = "15";
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

  const defaultBrand = () => {
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/brand/getallBrand",
    };
    axios
      .request(options)
      .then((response) => {
        setGetallBrand(response.data);
        console.log("dddd", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
    <ToastContainer/>
      <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Brand List </h2>

        <div className="mb-3 w-[40%]">
          <input
            type="search"
            className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
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
        <div className="  items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <div className="flex  justify-end mt-7 ">
            <Link href="/create-brand"></Link>
            <button
              onClick={openDrawer}
              className="rounded-md p-2 bg-lightBlue-600 text-white cursor-pointer"
            >
              + Add Brand
            </button>
          </div>
        </div>
      )}
      {isDrawerOpen && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[45%] p-4 overflow-y-auto  transition-transform -translate-x-0 bg-white w-4/12   border rounded-lg"
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
          <div className="">
            <CreateBrand closeDrawer={closeDrawer} refreshData={refreshData} />
          </div>
        </div>
      )}
      {isDrawerOpenO && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[45%] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-4/12  "
          tabIndex={-1}
          aria-labelledby="drawer-form-label"
        >
          <button
            type="button"
            onClick={closeDrawerO}
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
            <Editbrand
              closeDrawer={closeDrawerO}
              refreshData={refreshData}
              editData={editData}
              brandEdit={brandEdit}
            />
          </div>
        </div>
      )}
      <table className="table-auto bg-white rounded-md mt-5  relative  ">
        <thead className="">
          <tr className="bg-coolGray-200 text-gray-400 text-sm text-start flex gap-48 items-center ">
            <input
              type="checkbox"
              className="mx-3  cursor-pointer "
              onChange={handleSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
            {headItems.map((items, inx) => (
              <th className="text-start py-5 text-[14px] font-medium" key={inx}>
                {items}
              </th>
            ))}
          </tr>
        </thead>
        {getallBrand.map((items, index) => {
          const isItemSelected = isSelected(items?._id);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <tbody>
              <tr
                className="flex gap-48 cursor-pointer"
                role="checkbox"
                onClick={(event) => handleClick(event, items?._id)}
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <td className="">
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
                <td className="py-5 text-[18px] w-[2%]">
                  {" "}
                  {items?.brand ? items?.brand : "-"}
                </td>
                <td className="py-5 text-[18px] tex">
                  <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                    selling
                  </p>
                </td>

                <td className=" flex">
                  <button className="flex">
                    <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500 m-2" />

                    <button onClick={() => openDrawerO(items?._id)}>
                      <PencilSquareIcon className="cursor-pointer h-6 w-6  text-lightBlue-600 m-2 " />
                    </button>

                    <button
                      type="button"
                      onClick={() => openModal(items?._id)}
                      className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
                    </button>
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
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
