import React from "react";

const NavButtons = ({ data, logo, popup }) => {
  return (
    <div
      className=" flex min-w-20 cursor-pointer flex-wrap h-10 bg-white items-center gap-1 border-2 border-black px-2  overflow-hidden text-black"
      onClick={popup}
    >
      {/* <div>
        <img src={logo} alt="" className="w-6 " />
      </div> */}
      <div>{data}</div>
    </div>
  );
};

export { NavButtons };
