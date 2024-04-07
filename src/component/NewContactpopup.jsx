import React, { useState } from "react";
import fileLogo from "../assets/contact.png";
import Inputfield from "./Inputfield";
import Basicinfo from "./Basicinfo";
import Conversation from "./Conversation";
const NewContactpopup = ({ display, data, updateall }) => {
  const [showbasic, setShowbasic] = useState(true);
  const [conversationbg, setconversationbg] = useState("none");
  const [basicInfobg, setbasicInfobg] = useState("white");
  console.log(`this from contactpopup ${data.title}`);
  const showConversation = () => {
    setShowbasic(false);
    setconversationbg("white");
    setbasicInfobg("none");
    //  const conversation="white"
  };
  const showbasicInfo = () => {
    setShowbasic(true);
    setconversationbg("none");
    setbasicInfobg("white");
  };
  // const [showConversation , setShowconversation]=useState(false)
  return (
    <div
      className={
        "w-screen h-screen  fixed z-10 flex justify-center items-center  bg-[#0c0d0c7a]"
      }
    >
      <div
        className={
          " min-w-[850px]  min-h-[480px] bg-slate-50 rounded-xl overflow-hidden"
        }
      >
        <div className=" h-full">
          <div className="controlbar w-full h-8 bg-[rgb(0 0 204 / var(--tw-bg-opacity))] flex justify-between">
            <div className="flex pl-5 items-center">
              <img src={fileLogo} alt="" className="w-5 h-5 mr-1" />
              <p>Add new contact</p>
            </div>
            <div
              className="closebtn mr-4 px-2 my-0.5 text-md cursor-pointer  font-semibold"
              onClick={display}
            >
              X
            </div>
          </div>
          <div className="heading w-full h-10 bg-[#ffe330c1] ">
            <div className="flex justify-between w-full h-full ">
              <div className="w-3/4 h-full justify-between  flex">
                <div className="flex h-full items-center  ml-3">
                  <div>
                    <img src={fileLogo} alt="" className=" w-5 mr-1" />
                  </div>
                  <div> {data.title}</div>
                </div>
                <div className="flex h-full items-end pr-16">
                  <div
                    className={
                      "butn px-2 mr-2 border-2 border-gray-500 text-black cursor-pointer"
                    }
                    style={{ background: basicInfobg }}
                    onClick={showbasicInfo}
                  >
                    {" "}
                    Basic information
                  </div>
                  <div
                    className={
                      "butn px-2 mr-2 border-2 border-gray-500 cursor-pointer"
                    }
                    style={{ background: conversationbg }}
                    onClick={showConversation}
                  >
                    Conversation
                  </div>
                </div>
              </div>
              <div className=" h-full px-2 flex justify-center text-stone-100 items-center  bg-[#272260]">
                setting
              </div>
            </div>
          </div>
          <div className="content h-[440px]">
            {showbasic ? (
              <Basicinfo display={display} data={data} updateall={updateall} />
            ) : (
              <Conversation display={display} />
            )}
            {/* <Basicinfo /> */}
            {/* <Conversation/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewContactpopup;
