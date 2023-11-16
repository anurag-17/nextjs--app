// import React from "react";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import axios from "axios";

// const EditCustomer = ({ _id }) => {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [editData, setEditData] = useState({});
//   const [isFetching, setIsFetching] = useState(false);
//   const [updateCustomer, setUpdateCustomer] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     mobile: "",
//     address: "",
//     dob: "",
//     country: "",
//     language: "",
//     about: "",
//   });

//   const inputHandler = (e) => {
//     const { name, value } = e.target;

//     if (name === "color") {
//       setUpdateCustomer({
//         ...updateCustomer,
//         [name]: value.split(","),
//       });
//     } else if (name === "brand") {
//       setUpdateCustomer({
//         ...updateCustomer,
//         [name]: value.toUpperCase(),
//       });
//     } else {
//       setUpdateCustomer({
//         ...updateCustomer,
//         [name]: value,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchCustomer();
//   }, [_id]);

//   const fetchCustomer = async () => {
//     try {
//       setIsFetching(true);
//       const res = await axios.get(
//         `https://e-commerce-backend-brown.vercel.app/api/auth/all-users/${slug}`,
//         {
//           cache: "no-store",
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch customer");
//       }

//       const data = await res.json();
//       setIsFetching(data.name);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleUpdateCustomer = async (e) => {
//     e.preventDefault();

//     const options = {
//       method: "put",
//       url: `https://e-commerce-backend-brown.vercel.app/api/auth/edit-user`,
//       headers: {
//         cookie:
//           "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
//         "Content-Type": "application/json",
//         "User-Agent": "insomnia/2023.5.8",
//         // Authorization: "Bearer " + token,
//       },
//       data: {
//         firstname: updateCustomer?.firstname
//           ? updateCustomer?.firstname
//           : editData?.firstname,

//         lastname: updateCustomer?.lastname
//           ? updateCustomer?.lastname
//           : editData?.lastname,

//         email: updateCustomer?.email ? updateCustomer?.email : editData?.email,

//         mobile: updateCustomer?.mobile
//           ? updateCustomer?.mobile
//           : editData?.mobile,
//         address: updateCustomer?.address
//           ? updateCustomer?.address
//           : editData?.address,
//         dob: updateCustomer?.dob ? updateCustomer?.dob : editData?.dob,
//         country: updateCustomer?.country
//           ? updateCustomer?.country
//           : editData?.country,
//         language: updateCustomer?.language
//           ? updateCustomer?.language
//           : editData?.language,
//         about: updateCustomer?.about ? updateCustomer?.about : editData?.about,
//       },
//     };

//     axios
//       .request(options)
//       .then(function (response) {
//         console.log(response);
//         if (response.status === 200) {
//           router.push("/customer");
//         } else {
//           setLoading(false);
//           return;
//         }
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <div className="flex justify-  items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[70px] my-5 ">
//         <h2 className="text-2xl font-semibold pb-4 ">Edit Customer </h2>
//         <div className="mb-3 w-[40%]"></div>
//       </div>

//       <form
//         onSubmit={handleUpdateCustomer}
//         className=" bg-white border  rounded-lg p-2 mx-auto"
//       >
     
//         <div>
//           <div className="flex">
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//               Customer Name:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.firstname}
//                 defaultValue={
//                   editData?.firstname
//                     ? editData?.firstname
//                     : updateCustomer.firstname
//                 }
//                 type="text"
//                 name="firstname"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 // className="custom-input"
//                 required
//                 minLength={3}
//                 max={84}
//               />{" "}
//             </div>
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//                 Company Name:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.lastname}
//                 defaultValue={
//                   editData?.lastname
//                     ? editData?.lastname
//                     : updateCustomer.lastname
//                 }
//                 type="text"
//                 name="lastname"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 required
//               />{" "}
//             </div>
//           </div>
//           <div className="flex">
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//                 Email:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.email}
//                 defaultValue={
//                   editData?.email ? editData?.email : updateCustomer.email
//                 }
//                 type="text"
//                 name="email"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 required
//               />{" "}
//             </div>
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//                 Phone No.:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.mobile}
//                 defaultValue={
//                   editData?.mobile ? editData?.mobile : updateCustomer.mobile
//                 }
//                 type="number"
//                 name="mobile"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 required
//               />{" "}
//             </div>
//           </div>
//           <div className="flex">
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//                 Address:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.address}
//                 defaultValue={
//                   editData?.address ? editData?.address : updateCustomer.address
//                 }
//                 type="text"
//                 name="address"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 required
//               />{" "}
//             </div>
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//                 DOB:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.dob}
//                 defaultValue={
//                   editData?.dob ? editData?.dob : updateCustomer.dob
//                 }
//                 type="text"
//                 name="dob"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 required
//               />{" "}
//             </div>
//           </div>
//           <div className="flex">
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//                 Country:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.country}
//                 defaultValue={
//                   editData?.country ? editData?.country : updateCustomer.country
//                 }
//                 type="text"
//                 name="country"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 required
//               />{" "}
//             </div>
//             <div className="w-full">
//               <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//                 Language:
//               </label>
//               <input
//                 onChange={inputHandler}
//                 value={updateCustomer.language}
//                 defaultValue={
//                   editData?.language
//                     ? editData?.language
//                     : updateCustomer.language
//                 }
//                 type="text"
//                 name="language"
//                 className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//                 required
//               />{" "}
//             </div>
//           </div>
//           <div className="w-6/12">
//             <label className="absolute mt-1 bg-white  ml-8 z-20 text-[18px] text-gray-800 bg-">
//               About:
//             </label>
//             <input
//               onChange={inputHandler}
//               value={updateCustomer.about}
//               defaultValue={
//                 editData?.about ? editData?.about : updateCustomer.about
//               }
//               type="text"
//               name="about"
//               className="px-3 py-2 rounded  m-5  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-10/12"
//               required
//             />{" "}
//           </div>
         
//         </div>
//         <button
//           type="submit"
//           onClick={handleUpdateCustomer}
//           className="border p-2 m-5 mt-0 rounded-lg bg-sky-600 text-white text-[20px]  "
//         >
//           Update Customer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditCustomer;
