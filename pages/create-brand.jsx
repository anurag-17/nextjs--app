import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';

const createbrand = () => {
  const [brand, setBrand] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        "https://e-commerce-backend-brown.vercel.app/api/brand/createBrand",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ brand }),
        }
      )
        .then((res) => {
          if (res.ok) {
            router.push("/brand");
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
    <div>
       <form  onSubmit={handleSubmit} className=' bg-white border w-1/2 p-2 mx-auto'>
      <div>
        <label>Brand Name:</label><br/>
        <input
         onChange={(e) => setBrand(e.target.value)}
          value={brand}
          type="text"
          name="name"
          className='border p-1 m-2'

        />
      </div>
      {/* <div className='my-2'>
        <label>Brand Logo:</label><br/>
        <input
          type="file"
          name="name"
          className=' p-1 m-2'

        />
      </div> */}
      {/* <div>
        <label>Brand Description:</label><br/>
        <textarea
          className='border p-1 m-2'
          name="description"
         
        />
      </div> */}
      <button type="submit" className='border p-1 m-2 rounded-lg bg-blue-600 text-white '>Create Brand</button>
    </form>
    </div>
  )
}

export default createbrand
