"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";

const CreateCategoryForm = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        "https://e-commerce-backend-brown.vercel.app/api/category/createCategory",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      )
        .then((res) => {
          if (res.ok) {
            router.push("/categories");
          } else {
            throw new Error("failed to create");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white border w-1/3 p-2 mx-auto"
    >
    <h1 className="text-2xl my-5">Add Categories :</h1>
      <div>
        <label>Name:</label>
        <br />
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="name"
          className="border p-1 m-2"
        />
      </div>
      <button
        type="submit"
        className="border p-1 m-2 rounded-lg bg-blue-600 text-white "
      >
        Create Category
      </button>
    </form>
  );
};

export default CreateCategoryForm;
