import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AddVendor = () => {
  const router = useRouter();
  const [vendorDetails, setVendorDetails] = useState({
    vendorName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setVendorDetails({
        ...vendorDetails,
        [name]: value.split(","),
      });
    } else {
      setVendorDetails({
        ...vendorDetails,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/vendor/createVendor",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ9MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
      },
      data: vendorDetails,
    };

    axios.request(options).then(function (response) {
      if (response.status === 200) {
        router.push("/vendor");
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className=" bg-white border w-1/3 p-2 mx-auto"
      >
        <h1 className="text-2xl my-5">Add Vendor :</h1>
        <div>
          <label>Vendor Name:</label>
          <br />
          <input
            onChange={inputHandler}
            value={vendorDetails.vendorName}
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
            value={vendorDetails.companyName}
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
            value={vendorDetails.email}
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
            value={vendorDetails.phone}
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
            value={vendorDetails.address}
            type="text"
            name="address"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
        </div>
        <button
          type="submit"
          className="border p-2 m-2 rounded-lg bg-blue-600 text-white "
        >
          Add Vendor
        </button>
      </form>
    </>
  );
};

export default AddVendor;
