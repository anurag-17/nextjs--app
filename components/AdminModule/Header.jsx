import React from 'react'

const Header = ({headTitle}) => {
  return (
    <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
    <h2 className="text-2xl font-semibold"> {headTitle}</h2>
    <h2>Welcome Back, Clint</h2>
  </div>
  )
}

export default Header