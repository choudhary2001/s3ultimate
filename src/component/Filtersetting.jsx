import React from "react";

const Filtersetting = () => {
  return (
    <>
      <div className="w-[96%] h-[80%] bg-white  rounded-lg p-1 px-3 ">
        <div className="ml-4 flex items-center h-6  pl-2 mt-2">
          {" "}
          <input type="checkbox" name="check1" id="" className="w-6 h-4" />
          track who reading email
        </div>
        <div className="w-full h-8  flex justify-between">
          <div className="w-[100px] pl-3 flex items-center ">Mode</div>
          <select name="" id="" className="w-[200px]">
            <option value="">Highest</option>
            <option value="">Highest</option>
            <option value="">Highest</option>
          </select>
        </div>
        <div className="flex w-full justify-between mb-2 mt-2">
          <p className="pl-3">enter this three three</p>
          <input type="text" className="border-2 border-gray-600 px-1" />
        </div>
        <div className="flex w-full justify-between">
          <p className="pl-3">enter this three three</p>
          <input type="text" className="border-2 border-gray-600 px-1" />
        </div>
        <div className="ml-4 flex items-center h-6  pl-2 mt-2">
          {" "}
          <input type="checkbox" name="check1" id="" className="w-6 h-4" />
          track who reading email
        </div>
        <div className="ml-4 flex items-center h-6  pl-2 mt-2">
          {" "}
          <input type="checkbox" name="check1" id="" className="w-6 h-4" />
          track who reading email
        </div>
        <div className="w-full flex justify-center mt-3">
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            className="border-2 border-gray-700 resize-none px-2 text-sm"
          ></textarea>
        </div>
        <div className="ml-4 flex items-center h-6  pl-2 mt-2">
          {" "}
          <input type="checkbox" name="check1" id="" className="w-6 h-4" />
          track who reading email
        </div>
        <div className="w-full flex justify-center mt-3">
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            className="border-2 border-gray-700 resize-none px-2 text-sm"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Filtersetting;
