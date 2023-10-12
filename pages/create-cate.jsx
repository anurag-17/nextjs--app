import React, { useState } from 'react';
import axios from 'axios';

function CreateCategoryForm() {
  const [category, setCategory] = useState({
    name: '',
    description: '',
   
  });

  const apiUrl = 'https://e-commerce-backend-brown.vercel.app/api/category/createCategory';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams(category).toString(); 

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      });

      console.log('Category created successfully');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}  className=' bg-white border w-1/2 p-2 mx-auto'>
      <div>
        <label>Name:</label><br/>
        <input
          type="text"
          name="name"
          className='border p-1 m-2'
          value={category.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label><br/>
        <textarea
          className='border p-1 m-2'
          name="description"
          value={category.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className='border p-1 m-2 rounded-lg bg-blue-600 text-white '>Create Category</button>
    </form>
  );
}

export default CreateCategoryForm;
