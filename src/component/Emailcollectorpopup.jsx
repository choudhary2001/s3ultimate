import React from "react";
import { NavButtons } from "./Buttons";
import fileLogo from "../assets/files.png";
import playLogo from "../assets/play.png";
import plusLogo from "../assets/plus.png";

const Emailcollectorpopup = ({ display }) => {
  return (
    <div>
      <div className="w-screen h-screen  backdrop-blur-[1px]  fixed z-10 flex justify-center items-center">
        <div className="min-w-[900px] min-h-[600px] bg-slate-100 rounded-lg overflow-hidden ">
          <div className="topcontrol w-full ">
            <div className=" h-[35px] bg-[rgb(0 0 204 / var(--tw-bg-opacity))]  flex justify-between">
              <div className="flex gap-5  font-serif items-center h-full ml-5">
                <button className="text-sm border-b-2 border-neutral-900">
                  File
                </button>
                <button className="text-sm border-b-2 border-neutral-900">
                  Edit
                </button>
                <button className="text-sm border-b-2 border-neutral-900">
                  Tools
                </button>
                <button className="text-sm border-b-2 border-neutral-900">
                  Help
                </button>
                <button className="text-sm border-b-2 border-neutral-900">
                  Language
                </button>
              </div>
              <div
                className=" h-full flex items-center mr-4 cursor-pointer "
                onClick={display}
              >
                <div>X</div>
              </div>
            </div>
          </div>
          <div className="Navbar flex gap-4 w-full bg-[#ffe100ed] h-12 items-center pl-4">
            <div className="border-2 border-gray-400 flex w-24 justify-center items-center gap-1 h-4/6 rounded-lg px-2">
              <div>
                <img src={plusLogo} alt="" className="w-6" />
              </div>
              <div>
                <div>New</div>
              </div>
            </div>
            <div className="border-gray-400 border-2 flex w-24 justify-center items-center gap-1 h-4/6 rounded-lg px-2">
              <div>
                <img src={fileLogo} alt="" className="w-6" />
              </div>
              <div>
                <div>Open</div>
              </div>
            </div>
            <div className=" border-2 border-gray-400  flex w-24 justify-center items-center gap-1 h-4/6 rounded-lg px-2">
              <div>
                <img src={fileLogo} alt="" className="w-6" />
              </div>
              <div>
                <div>Save</div>
              </div>
            </div>
            <div className="border-2 border-gray-400  flex w-24 justify-center items-center gap-1 h-4/6 rounded-lg px-2">
              <div>
                <img src={fileLogo} alt="" className="w-6" />
              </div>
              <div>
                <div>Search</div>
              </div>
            </div>
            <div className="border-2 border-gray-400  flex  justify-center items-center gap-1 h-4/6 rounded-lg px-2">
              <div>
                <img src={playLogo} alt="" className="w-6" />
              </div>
              <div>
                <div>Start Hunt</div>
              </div>
            </div>
            <div className="border-2 border-gray-400  flex  justify-center items-center gap-1 h-4/6 rounded-lg px-2">
              <div>
                <img src={fileLogo} alt="" className="w-6" />
              </div>
              <div>
                <div>Stop Hunt</div>
              </div>
            </div>
            <div className="border-2 border-gray-400  flex  justify-center items-center gap-1 h-4/6 rounded-lg px-2">
              <div>
                <img src={fileLogo} alt="" className="w-6" />
              </div>
              <div>
                <div>User Guide</div>
              </div>
            </div>
          </div>
          <div>
            <div className="searchbar">
              <div className="flex w-full py-1 border-gray-700 justify-around border-b-2 ">
                <p>Website:</p>
                <input
                  type="text"
                  className="border-2 px-2 border-gray-500 w-[600px]"
                />
                <p>
                  <select name="" id="" className="w-[100px] border-2  px-2">
                    <option value="">start hunt</option>
                  </select>
                </p>
              </div>
            </div>
            <div className="h-[458px] w-full">
              <table className="w-full">
                <thead className="w-full bg-gray-100">
                  <tr>
                    <th className=" text-gray-400">No.</th>
                    <th className=" text-gray-400">Email</th>
                    <th className=" text-gray-400">title</th>
                    <th className=" text-gray-400">url</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>1</td>
                    <td>abcdefjghg@gmail.com</td>
                    <td>this is title</td>
                    <td>www.ww. urlsss.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full h-[23px] bg-[rgb(0 0 204 / var(--tw-bg-opacity))] flex gap-4 pl-2">
              <div>total 0</div>
              <div>scanned 0</div>
              <div>scanning 0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emailcollectorpopup;
