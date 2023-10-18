import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const EditCate = ({ _id }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [productDetails, setProductDetails] = useState({
    title: "",
  });

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setProductDetails({
        ...productDetails,
        [name]: value.split(","),
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
    fetchCategory();
  }, [_id]);

  const fetchCategory = async () => {
    try {
      setIsFetching(true);
      const res = await fetch(
        `https://e-commerce-backend-brown.vercel.app/api/category/updateCategory/${slug}`,
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

  
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "PUT",
      url: `https://e-commerce-backend-brown.vercel.app/api/category/updateCategory/${slug}`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        // Authorization: "Bearer " + token,
      },
      data: {
        title: productDetails?.title ? productDetails?.title : editData?.title,
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
          router.push("/categories");
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
      <form onSubmit={handleUpdateCategory}>
        <h1 className="text-2xl my-5">Edit Categories :</h1>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div>
            <label>Update category:</label>
            <br />
            <input
              type="text"
              name="title"
              className="border p-1 m-2"
              value={productDetails.title}
              defaultValue={
                editData?.title ? editData?.title : productDetails.title
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
          onClick={handleUpdateCategory}
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCate;
