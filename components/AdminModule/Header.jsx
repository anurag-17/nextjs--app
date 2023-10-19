import React from 'react'

const Header = ({headTitle}) => {
  return (
    <div className="flex justify-between items-center px-10 border pt-4 border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
    <h2 className="text-2xl font-semibold pb-4"> {headTitle}</h2>
    <h2>Welcome Back, Admin</h2>
  </div>
  )
}

export default Header