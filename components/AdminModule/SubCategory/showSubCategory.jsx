import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const ShowSubCategory = ({ allSubCategory, openDrawerO, openModal }) => {
  const headItems = ["S. No.", "sub category", "MAIN Category", "ACTION"];

  console.log(allSubCategory);
  return (
    <table className="table-auto bg-white rounded-md mt-5 relative">
      <thead className="">
        <tr className="bg-coolGray-200 text-gray-400 text-sm text-start grid grid-cols-4 justify-between items-center gap-x-20">
          {headItems.map((header, index) => (
            <th
              className="py-5 px-4 text-[14px] font-medium uppercase text-left"
              key={index}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {allSubCategory?.length > 0 &&
          allSubCategory?.map((item, index) => (
            <tr
              key={index}
              className="grid grid-cols-4 justify-between cursor-pointer gap-x-20 text-left px-4"
            >
              <td className="py-5 text-[18px] text-left">{index + 1}</td>
              <td className="py-5 text-[18px] text-left capitalize">
                {item?.subCategory ? item?.subCategory : "-"}
              </td>
              <td className="py-5 text-[18px] text-left capitalize">
                {item?.category?.title}
              </td>
              <td className="flex gap-5">
                <button onClick={() => openDrawerO({ subCateId: item._id })}>
                  <PencilSquareIcon className="cursor-pointer h-6 w-6 text-lightBlue-600 m-2" />
                </button>
                <button
                  type="button"
                  onClick={() => openModal(item._id)}
                  className="rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <TrashIcon className="cursor-pointer h-6 w-6 text-red-800" />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ShowSubCategory;
