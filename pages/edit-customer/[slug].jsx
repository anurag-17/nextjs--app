import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

const EditCustomer = ({ _id }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [editData, setEditData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    country: "",
    language: "",
    about: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setUpdateCustomer({
        ...updateCustomer,
        [name]: value.split(","),
      });
    } else if (name === "brand") {
      setUpdateCustomer({
        ...updateCustomer,
        [name]: value.toUpperCase(),
      });
    } else {
      setUpdateCustomer({
        ...updateCustomer,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [_id]);

  const fetchCustomer = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(
        `https://e-commerce-backend-brown.vercel.app/api/auth/all-users/${slug}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch customer");
      }

      const data = await res.json();
      setIsFetching(data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();

    const options = {
      method: "put",
      url: `https://e-commerce-backend-brown.vercel.app/api/auth/edit-user`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        // Authorization: "Bearer " + token,
      },
      data: {
        firstname: updateCustomer?.firstname
          ? updateCustomer?.firstname
          : editData?.firstname,

        lastname: updateCustomer?.lastname
          ? updateCustomer?.lastname
          : editData?.lastname,

        email: updateCustomer?.email ? updateCustomer?.email : editData?.email,

        mobile: updateCustomer?.mobile
          ? updateCustomer?.mobile
          : editData?.mobile,
        address: updateCustomer?.address
          ? updateCustomer?.address
          : editData?.address,
        dob: updateCustomer?.dob ? updateCustomer?.dob : editData?.dob,
        country: updateCustomer?.country
          ? updateCustomer?.country
          : editData?.country,
        language: updateCustomer?.language
          ? updateCustomer?.language
          : editData?.language,
        about: updateCustomer?.about ? updateCustomer?.about : editData?.about,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          router.push("/customer");
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
        onSubmit={handleUpdateCustomer}
        className=" bg-white border w-1/3 p-2 mx-auto"
      >
        <h1 className="text-2xl my-5">Update Vendor :</h1>
        <div>
          <label>Vendor Name:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateCustomer.firstname}
            defaultValue={
              editData?.firstname
                ? editData?.firstname
                : updateCustomer.firstname
            }
            type="text"
            name="firstname"
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
            value={updateCustomer.lastname}
            defaultValue={
              editData?.lastname ? editData?.lastname : updateCustomer.lastname
            }
            type="text"
            name="lastname"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>Email:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateCustomer.email}
            defaultValue={
              editData?.email ? editData?.email : updateCustomer.email
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
            value={updateCustomer.mobile}
            defaultValue={
              editData?.mobile ? editData?.mobile : updateCustomer.mobile
            }
            type="number"
            name="mobile"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>Address:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateCustomer.address}
            defaultValue={
              editData?.address ? editData?.address : updateCustomer.address
            }
            type="text"
            name="address"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>DOB:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateCustomer.dob}
            defaultValue={editData?.dob ? editData?.dob : updateCustomer.dob}
            type="text"
            name="dob"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>Country:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateCustomer.country}
            defaultValue={
              editData?.country ? editData?.country : updateCustomer.country
            }
            type="text"
            name="country"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>Language:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateCustomer.language}
            defaultValue={
              editData?.language ? editData?.language : updateCustomer.language
            }
            type="text"
            name="language"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
          <label>About:</label>
          <br />
          <input
            onChange={inputHandler}
            value={updateCustomer.about}
            defaultValue={
              editData?.about ? editData?.about : updateCustomer.about
            }
            type="text"
            name="about"
            className="border p-1 m-2"
            required
          />{" "}
          <br />
        </div>
        <button
          type="submit"
          onClick={handleUpdateCustomer}
          className="border p-2 m-2 rounded-lg bg-blue-600 text-white "
        >
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
