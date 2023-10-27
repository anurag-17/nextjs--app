import React from 'react'

const UserUpdatePaymentM = () => {
  return (
    <div>
       <div className="ml-5">
        <div className="bg-white p-5 border">
          <div className="flex flex-row justify-end">
            <div>
              <button className="bg-sky-600 m-4 text-white px-6 py-4 rounded font-medium text-lg">
                Add New Bank
              </button>
              <button className="bg-green-600 text-white px-6 py-4 rounded font-medium text-lg">
                Add New Card
              </button>
            </div>
          </div>
          <p className="font-medium text-lg">Add a payment method</p>
          <div className="my-7">
            <div className="flex justify-between items-center">
              <div className="flex">
                 <div className="space-y-2 ml-4">
                  <p className="font-medium text-lg opacity-70 ">
                    Bank of America
                  </p>
                  <p className="opacity-70 text-lg ">Bank ************ 5421</p>
                  <p className="text-green-600">Verified</p>
                </div>
              </div>
              <div>
                <button className="bg-yellow-400  px-5 py-3 rounded font-medium text-lg">
                  Manage
                </button>
              </div>
            </div>
          </div>
          <hr/>

          <div className="my-7">
            <div className="flex justify-between items-center">
              <div className="flex">
               
                <div className="space-y-2 ml-4">
                  <p className="font-medium text-lg opacity-70 ">
                    Bank of America
                  </p>
                  <p className="opacity-70 text-lg ">Bank ************ 3497</p>
                  <p className="text-green-600">Verified</p>
                </div>
              </div>
              <div>
                <button className="bg-yellow-400  px-5 py-3 rounded font-medium text-lg">
                  Manage
                </button>
              </div>
            </div>
          </div>
          <hr/>

          <div className="my-7">
            <div className="flex justify-between items-center">
              <div className="flex">
             
                <div className="space-y-2 ml-4">
                  <p className="font-medium text-lg opacity-70 ">
                    Bank of America
                  </p>
                  <p className="opacity-70 text-lg ">Bank ************ 8945</p>
                  <p className="text-green-600">Verified</p>
                </div>
              </div>
              <div>
                <button className="bg-yellow-400  px-5 py-3 rounded font-medium text-lg">
                  Manage
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default UserUpdatePaymentM

