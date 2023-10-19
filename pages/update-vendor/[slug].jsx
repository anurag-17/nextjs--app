import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

const updateVendor = ({ _id }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [editData, setEditData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [updateVendor, setUpdateVendor] = useState({
    vendorName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setUpdateVendor({
        ...updateVendor,
        [name]: value.split(","),
      });
    } else if (name === "brand") {
      setUpdateVendor({
        ...updateVendor,
        [name]: value.toUpperCase(),
      });
    } else {
      setUpdateVendor({
        ...updateVendor,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [_id]);

  const fetchVendor = async () => {
    try {
      setIsFetching(true);
      const res = await fetch(
        `https://e-commerce-backend-brown.vercel.app/api/vendor/getAllVendors/${slug}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }

      const data = await res.json();
      setIsFetching(data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateVendor = async (e) => {
    e.preventDefault();

    const options = {
      method: "PUT",
      url: `https://e-commerce-backend-brown.vercel.app/api/vendor/updateVendor/${slug}`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        // Authorization: "Bearer " + token,
      },
      data: {
        vendorName: updateVendor?.vendorName
          ? updateVendor?.vendorName
          : editData?.vendorName,
        companyName: updateVendor?.companyName
          ? updateVendor?.companyName
          : editData?.companyName,
        email: updateVendor?.email ? updateVendor?.email : editData?.email,
        phone: updateVendor?.phone ? updateVendor?.phone : editData?.phone,
        address: updateVendor?.address
          ? updateVendor?.address
          : editData?.address,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          router.push("/vendor");
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleUpdateVendor}
        className=" bg-white border w-1/3 p-2 mx-auto"
      >
        <h1 className="text-2xl my-5">Update Vendor :</h1>
        <div>
          <label>Vendor Name:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateVendor.vendorName}
            defaultValue={
              editData?.vendorName
                ? editData?.vendorName
                : updateVendor.vendorName
            }
            type="text"
            name="vendorName"
            className="border p-1 m-2"
            // className="custom-input"
            required
            minLength={3}
            max={84}
          />{" "}
          <br />
          <label>Company Name:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateVendor.companyName}
            defaultValue={
              editData?.companyName
                ? editData?.companyName
                : updateVendor.companyName
            }
            type="text"
            name="companyName"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>Email:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateVendor.email}
            defaultValue={
              editData?.email ? editData?.email : updateVendor.email
            }
            type="text"
            name="email"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>Phone No.:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateVendor.phone}
            defaultValue={
              editData?.phone ? editData?.phone : updateVendor.phone
            }
            type="number"
            name="phone"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>Address:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateVendor.address}
            defaultValue={
              editData?.address ? editData?.address : updateVendor.address
            }
            type="text"
            name="address"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
        </div>
        <button
          type="submit"
          onClick={handleUpdateVendor}
          className="border p-2 m-2 rounded-lg bg-blue-600 text-white "
        >
          Add Vendor
        </button>
      </form>
    </div>
  );
};

export default updateVendor;
