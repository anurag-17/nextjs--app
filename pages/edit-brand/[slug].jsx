import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Editbrand = ({ _id }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [productDetails, setProductDetails] = useState({
    brand: "",
  });

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const inputHandler = (e) => {
    const { name, value, brand } = e.target;

    if (brand === "color") {
      setProductDetails({
        ...productDetails,
        [brand]: value.split(","),
      });
    } else if (name === "brand") {
      setProductDetails({
        ...productDetails,
        [name]: value.toUpperCase(),
      });
    } else {
      setProductDetails({
        ...productDetails,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    // Fetch the category data when the component mounts
    fetchBrand();
  }, [_id]);

  const fetchBrand = async () => {
    try {
      setIsFetching(true);
      const res = await fetch(
        `https://e-commerce-backend-brown.vercel.app/api/brand/updateBrand/${slug}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }

      const data = await res.json();
      setCategory(data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "PUT",
      url: `https://e-commerce-backend-brown.vercel.app/api/brand/updateBrand/${slug}`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        // Authorization: "Bearer " + token,
      },
      data: {
        brand: productDetails?.brand ? productDetails?.brand : editData?.brand,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Product updated successfully !");
          refreshData();
          router.push("/brand");
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
    <div className="bg-white border w-1/3 p-2 mx-auto">
      <ToastContainer />
      <form onSubmit={handleUpdateBrand}>
        <h1 className="text-2xl my-5">Edit Categories :</h1>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div>
            <label>Update category:</label>
            <br />
            <input
              type="text"
              name="brand"
              className="border p-1 m-2"
              value={productDetails.brand}
              defaultValue={
                editData?.brand ? editData?.brand : productDetails.brand
              }
              // value={productDetails.title}
              onChange={inputHandler}
              required
              minLength={3}
              max={84}
            />
          </div>
        )}
        <button
          type="submit"
          className="border p-1 m-2 rounded-lg bg-blue-600 text-white"
          onClick={handleUpdateBrand}
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default Editbrand;
