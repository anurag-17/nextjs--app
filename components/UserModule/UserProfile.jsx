import React, { useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from 'next/router';
import UserNavbar from "./userNavbar";
import { BASE_URL } from "../../utlis/config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";



const UserProfile = ({ getAllCustomer, refreshData }) => {

  const router = useRouter();
  const { token } = useSelector((state) => state.auth.userDetails || null);
  const [UserDetail, setUserDetail] = useState({});
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const inputHandler = (e) => {
    setUserDetail({ ...UserDetail, [e.target.name]: e.target.value })
  }

  const handleEdit = () => {
    setEdit(true)
  }

  const goBack = () => {
    setEdit(false)
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/auth/edit-user`,
        UserDetail,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Details Updated successfully !");
        refreshData()
        setLoading(false);
        setEdit(false)
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

  }

  return (
    <>
      <ToastContainer />
      <UserNavbar />
      <div className=" px-20 ">
        <h1 className="text-[30px] pl-10 mb-5">Your Account</h1>
        <div className="bg-white ml-5 p-5 ">
          <div className="flex my-auto  bg-[#e2eaf5] px-10 py-5">
            <div className=" w-1/12">
              <img src="/user.png" className="rounded-[60%]   mb-0" />
              <p className="text-lightBlue-600 text-xl mx-10  cursor-pointer">Change</p>
            </div>
            <div className="my-auto ml-10 ">
              <h1 className="my-auto mx-5 text-[35px]">
                {" "}
                {getAllCustomer?.firstname} {getAllCustomer?.lastname}
              </h1>
              <p className="text-lightBlue-600 text-xl my-auto  mx-5">
                I am Professional Frontend Web Developer
              </p>
              <div className="flex mt-5 ml-5 justify-evenly w-6/12">
                <Link href="https://www.facebook.com" target="_blank">
                  <Image alt="social" src="/social/facebook.png" height={34} width={34} />
                </Link>
                <Link href="https://www.linkedin.com" target="_blank">
                  <Image alt="social" src="/social/linkedin.png" height={34} width={34} />
                </Link>
                <Link href="https://twitter.com" target="_blank">
                  <Image alt="social" src="/social/twitter.png" height={34} width={34} />
                </Link>
                {/* <img className="h-9 w-13" src="/add.svg" /> */}
              </div>
            </div>
          </div>
          <div className="mt-10 relative">


            {
              isEdit ?
                <>
                  <h1 className="text-[25px] my-10"> Change personal information</h1>
                  <div className="flex justify-center items-center gap-x-3 hover:bg-[#f3f3f3e0] px-6 py-1 rounded-md text-[18px] font-medium absolute top-2 right-[70px] cursor-pointer"
                    onClick={goBack}>
                    <Image src={`/svg/back.svg`} alt="go back" height={40} width={40} />
                    Go back
                  </div>
                  <form onSubmit={handleUpdate}>
                    <table className="table-fixed max-w-[50%]">
                      <tbody>
                        <tr>
                          <td className="p-3 text-[20px]">First Name</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px]">

                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="firstname"
                              placeholder=""
                              defaultValue={getAllCustomer?.firstname ? getAllCustomer?.firstname : UserDetail?.firstname}
                              onChange={inputHandler}
                              pattern="[A-Za-z ]+"
                              title="Enter only alphabetic characters"
                              maxLength={64}
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-[20px]">Last Name</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px]">

                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="lastname"
                              defaultValue={getAllCustomer?.lastname ? getAllCustomer?.lastname : UserDetail?.lastname}
                              onChange={inputHandler}
                              pattern="[A-Za-z ]+"
                              title="Enter only alphabetic characters"
                              maxLength={64}
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-[20px]">About</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px] ">

                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="about"
                              defaultValue={getAllCustomer?.about ? getAllCustomer?.about : UserDetail?.about}
                              onChange={inputHandler}
                              maxLength={300}
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3  text-[20px] ">Email</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px] ">
                            <input type="email" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="email"
                              defaultValue={getAllCustomer?.email ? getAllCustomer?.email : UserDetail?.email}
                              onChange={inputHandler}
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-[20px]">Mobile no</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px]">
                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="mobile"
                              defaultValue={getAllCustomer?.mobile ? getAllCustomer?.mobile : UserDetail?.mobile}
                              onChange={inputHandler}
                              pattern="[6789][0-9]{9}"
                              title="Enter 10 digit mobile no."
                              required
                              maxLength={10}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-[20px]">Date of Birth </td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px] ">
                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="dob"
                              defaultValue={getAllCustomer?.dob ? getAllCustomer?.dob : UserDetail?.dob}
                              onChange={inputHandler}
                              pattern="^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{4}$"
                              title="DD/MM/YYYY"
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-[20px]">Address</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px] ">
                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="address"
                              defaultValue={getAllCustomer?.address ? getAllCustomer?.address : UserDetail?.address}
                              onChange={inputHandler}
                              maxLength={100}
                              required />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-[20px]">Country</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px]  ">
                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="country"
                              defaultValue={getAllCustomer?.country ? getAllCustomer?.country : UserDetail?.country}
                              onChange={inputHandler}
                              pattern="[A-Za-z ]+"
                              title="Enter only alphabetic characters"
                              maxLength={64}
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-[20px]">Language</td>
                          <td className="px-10">:</td>
                          <td className="p-3 text-gray-500 text-[18px] ">
                            <input type="text" className="border-b border-b-gray-500 w-[350px] focus-visible:outline-none px-2"
                              name="language"
                              defaultValue={getAllCustomer?.language ? getAllCustomer?.language : UserDetail?.language}
                              onChange={inputHandler}
                              pattern="^[A-Za-z,]+$"
                              title="Enter language seperated by coma ','"
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 flex justify-center items-center rounded-md bg-lightBlue-600 text-white w-[200px] font-medium  mt-[40x]"
                    > {isLoading ? "Loading.." : "Update"}  </button>
                  </form>
                </>
                :
                <>

                  <h1 className="text-[25px] my-10">Personal Information</h1>
                  <table className="table-fixed ">
                    <tbody>
                      <tr>
                        <td className="p-3 text-[20px]">Full Name</td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px]">
                          {getAllCustomer?.firstname} {getAllCustomer?.lastname}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[20px]">About</td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px] ">
                          {getAllCustomer?.about}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3  text-[20px] ">Email</td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px] ">
                          {getAllCustomer?.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[20px]">Phone</td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px]">
                          {" "}
                          {getAllCustomer?.mobile}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[20px]">Date of Birth </td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px] ">
                          {" "}
                          {getAllCustomer?.dob}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[20px]">Address</td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px] ">
                          {getAllCustomer?.address}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[20px]">Country</td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px]  ">
                          {" "}
                          {getAllCustomer?.country}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[20px]">Language</td>
                        <td className="px-10">:</td>
                        <td className="p-3 text-gray-500 text-[18px] ">
                          {getAllCustomer?.language}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="absolute top-2 right-[70px] text-[30px] underline text-lightBlue-700 font-medium cursor-pointer"
                    disabled={isLoading}
                    onClick={handleEdit}
                  >  {
                      isLoading ? "Loading.. " : "Edit"} </div>
                </>
            }


          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(UserProfile), { ssr: false });
