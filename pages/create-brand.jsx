import React, { useState } from 'react';
import axios from 'axios';

function CreateBrandForm() {
  

//   const handleChange = (e) => {
//     setCategory({
//       ...category,
//       [e.target.name]: e.target.value,
//     });
//   };

  return (
    <form   className=' bg-white border w-1/2 p-2 mx-auto'>
      <div>
        <label>Brand Name:</label><br/>
        <input
          type="text"
          name="name"
          className='border p-1 m-2'

        />
      </div>
      <div className='my-2'>
        <label>Brand Logo:</label><br/>
        <input
          type="file"
          name="name"
          className=' p-1 m-2'

        />
      </div>
      <div>
        <label>Brand Description:</label><br/>
        <textarea
          className='border p-1 m-2'
          name="description"
         
        />
      </div>
      <button type="submit" className='border p-1 m-2 rounded-lg bg-blue-600 text-white '>Create Brand</button>
    </form>
  );
}

export default CreateBrandForm;
