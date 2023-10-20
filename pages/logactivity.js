import React from "react";
import Image from "next/image";
import Delete from '../public/deletebuton.svg';

const Logactivity = () => {
  return (
    <>
    <div className="ml-5">
      <div className="p-5 bg-white border">
      <div className="border p-5">
      <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-md font-light">
          <thead
            class="border-b text-lg bg-gray-300 font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" class="px-6 py-4">Name</th>
              <th scope="col" class="px-6 py-4">IP</th>
              <th scope="col" class="px-6 py-4">Time</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b bg-neutral-100 opacity-60 dark:border-neutral-500 dark:bg-neutral-700">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Chrome on Window</td>
              <td class="whitespace-nowrap px-6 py-4">278.281.987.111</td>
              <td class="whitespace-nowrap px-6 py-4">Mar 24, 2022 04:26 PM</td>
              <td class="whitespace-nowrap px-6 py-4"><Image className="w-8" src={Delete} /></td>
            </tr>
            <tr
              class="border-b opacity-60 transition duration-300 ease-in-out hover:bg-neutral-100 bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Chrome on Window</td>
              <td class="whitespace-nowrap px-6 py-4">278.281.987.111</td>
              <td class="whitespace-nowrap px-6 py-4">Mar 24, 2022 04:26 PM</td>
              <td class="whitespace-nowrap px-6 py-4"><Image className="w-8" src={Delete} /></td>
            </tr>
            <tr
              class="border-b opacity-60 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Chrome on Window</td>
              <td class="whitespace-nowrap px-6 py-4">278.281.987.111</td>
              <td class="whitespace-nowrap px-6 py-4">Mar 24, 2022 04:26 PM</td>
              <td class="whitespace-nowrap px-6 py-4"><Image className="w-8" src={Delete} /></td>
            </tr>
            <tr
              class="border-b opacity-60 transition duration-300 ease-in-out hover:bg-neutral-100 bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Chrome on Window</td>
              <td class="whitespace-nowrap px-6 py-4">278.281.987.111</td>
              <td class="whitespace-nowrap px-6 py-4">Mar 24, 2022 04:26 PM</td>
              <td class="whitespace-nowrap px-6 py-4"><Image className="w-8" src={Delete} /></td>
            </tr>
            <tr
              class="border-b opacity-60  bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Chrome on Window</td>
              <td class="whitespace-nowrap px-6 py-4">278.281.987.111</td>
              <td class="whitespace-nowrap px-6 py-4">Mar 24, 2022 04:26 PM</td>
              <td class="whitespace-nowrap px-6 py-4"><Image className="w-8" src={Delete} /></td>
            </tr>
            <tr
              class="border-b opacity-60 transition duration-300 ease-in-out hover:bg-neutral-100 bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Chrome on Window</td>
              <td class="whitespace-nowrap px-6 py-4">278.281.987.111</td>
              <td class="whitespace-nowrap px-6 py-4">Mar 24, 2022 04:26 PM</td>
              <td class="whitespace-nowrap px-6 py-4"><Image className="w-8" src={Delete} /></td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Logactivity;
