import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const ShowSubCategory = ({ allSubCategory, openDrawerO, openModal }) => {
  console.log(allSubCategory);
  return (
    <table className="table-auto bg-white rounded-md mt-5  relative w-full lg:w-8/12 xl:w-8/12">
      <thead className="">
        <tr
          className="bg-coolGray-200 text-gray-400 text-start flex w-full 
          2xl:text-[20px] 
          xl:text-[14px]
           lg:text-[12px] 
           md:text-[12px] 
           sm:text-[12px] 
           text-[10px]"
        >
          <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-2/12">
            S. No.
          </th>
          <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-4/12">
            sub category
          </th>
          <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-4/12">
            MAIN Category
          </th>
          <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-2/12">
            ACTION
          </th>
        </tr>
      </thead>

      <tbody>
        {allSubCategory?.length > 0 &&
          allSubCategory?.map((item, index) => (
            <tr
              key={index}
              className="text-start flex w-full 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[14px] sm:text-[13px] text-[10px]"
            >
              <td className="mx-5 my-auto w-2/12">{index + 1}</td>
              <td className=" my-auto w-4/12">
                {item?.subCategory ? item?.subCategory : "-"}
              </td>
              <td className="flex my-auto w-4/12">{item?.category?.title}</td>
              <td className="flex lg: w-2/12">
                <button onClick={() => openDrawerO({ subCateId: item._id })}>
                  <PencilSquareIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5  text-lightBlue-600 m-2 " />
                </button>
                <button
                  type="button"
                  onClick={() => openModal(item._id)}
                  className="rounded-md  bg-opacity-20 px-2 py-2 md:px-2 md:py-2 lg:px-4 lg:py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <TrashIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5 text-red-800" />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ShowSubCategory;
