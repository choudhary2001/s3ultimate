import React, { useState } from "react";
import Generalsetting from "./Generalsetting";
import Automaticsetting from "./Automaticsetting";
import Filtersetting from "./Filtersetting";

const AppSetting = ({ display, data, updateall }) => {
  const [filter, setFilter] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [general, setgeneral] = useState(true);
  return (
    <div>
      <div className="w-screen h-screen bg-[#4340406e] fixed z-10 backdrop-blur-[1px] flex justify-center items-center ">
        <div className="w-[400px] rounded-lg overflow-hidden h-[520px]  bg-[rgb(0 0 204 / var(--tw-bg-opacity))]  flex  items-center flex-col">
          <div className="theads w-full h-8 flex justify-between px-4  items-center">
            <div style={{ color: "white" }} >Settings</div>
            <div className="cursor-pointer" onClick={display}>
              X
            </div>
          </div>
          <div className="head w-full h-10 flex bg-[#272260] pl-8 items-center justify-center gap-3 pb-1 mb-1 pt-1 text-white">
            <div
              className="border-2 px-2 rounded-md cursor-pointer"
              style={{
                background: general ? "white" : "",
                color: general ? "#272260" : "",
              }}
              onClick={() => {
                setgeneral(true);
                setAutomatic(false);
                setFilter(false);
              }}
            >
              General Setting
            </div>
            {/* <div
              className="border-2 px-2 rounded-md cursor-pointer"
              style={{
                background: automatic ? "white" : "",
                color: automatic ? "#272260" : "",
              }}
              onClick={() => {
                setgeneral(false);
                setAutomatic(true);
                setFilter(false);
              }}
            >
              Automatic
            </div>
            <div
              className="border-2 px-3 rounded-md cursor-pointer "
              style={{
                background: filter ? "white" : "",
                color: filter ? "#272260" : "",
              }}
              onClick={() => {
                setgeneral(false);
                setAutomatic(false);
                setFilter(true);
              }}
            >
              Filter
            </div> */}
          </div>
          {/* general settings  */}
          {general ? <Generalsetting data={data} updateall={updateall} /> : <></>}
          {automatic ? <Automaticsetting /> : <></>}
          {filter ? <Filtersetting /> : <></>}

          <div className="flex justify-around w-full my-1">
            <div
              className="flex justify-between w-[80px] bg-slate-50 px-2"
              onClick={display}
            >
              <div>X</div>
              <div>Cancel</div>
            </div>
            <div onClick={display} className="flex justify-center w-[80px] bg-slate-50  px-2 items-center">
              <div>Ok</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSetting;
