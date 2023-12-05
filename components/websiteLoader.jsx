import React from "react";

const WebsiteLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#7871716e] fixed left-0 right-0 top-0 bottom-0 z-[99] ">

            <div className="flex space-x-4">
            <div className="animate-spin w-[200px] h-[200px] border-t-4 border-blue-700 border-solid rounded-full mb-4"></div>
            </div>

        </div>
    )
};

export default WebsiteLoader;
