import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Editcolor = ({ colorEID }) => {
  const productID = "yourProductIDHere";
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [colorDetails, setColorDetails] = useState({
    color: "",
  });

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const inputHandler = (e) => {
    const { name, value, color } = e.target;

    if (color === "color") {
      setColorDetails({
        ...colorDetails,
        [color]: value.split(","),
      });
    } else if (name === "color") {
      setColorDetails({
        ...colorDetails,
        [name]: value,
      });
    } else {
      setColorDetails({
        ...colorDetails,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    fetchcolor();
  }, []);

  const fetchcolor = async () => {
    try {
      setIsFetching(true);
      const res = await fetch(
        "https://e-commerce-backend-brown.vercel.app/api/color/getColors",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch color");
      }

      const data = await res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  const handleUpdatecolor = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "PUT",
      url: "https://e-commerce-backend-brown.vercel.app/api/color/updatecolor",
      headers: {
        cookie:
          "connect.sid=s%3ABuT7RO-v8jLZ-gfUMoxE7nAR5aaTzqgH.SaRAdf84mDvMkyuvYWLAAMEb6H31lWDA%2Ft9SkI6qRIE; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzEwNmMzNjg0MmY5YzljYmUwN2JjNSIsImlhdCI6MTcwMDAyNTQ3MCwiZXhwIjoxNzAwMTExODcwfQ.-wqsEhmD3dI4TYlEMvOQ1j_QBLLDSJkpPxnEwh6lhdU",
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.34.0",
      },
      data: {
        id: colorEID,
        color: colorDetails?.color ? colorDetails?.color : editData?.color,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("color updated successfully !");
          refreshData();
          router.push("/color");
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
      <ToastContainer />

      <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Edit color </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
      <div className="bg-white border rounded-lg  p-2 mx-auto">
        <form onSubmit={handleUpdatecolor}>
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            <div>
              <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                color Name:
              </label>

              <input
                type="text"
                name="color"
                className="px-3 py-2 rounded m-10   border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                value={colorDetails.color}
                defaultValue={
                  editData?.color ? editData?.color : colorDetails.color
                }
             
                onChange={inputHandler}
                required
                minLength={3}
                max={84}
              />
            </div>
          )}
          <button
            type="submit"
            className="border p-2 m-10 mt-0 rounded-lg bg-sky-600 text-white text-[20px] "
            onClick={handleUpdatecolor}
          >
            Update color
          </button>
        </form>
      </div>
    </>
  );
};

export default Editcolor;
