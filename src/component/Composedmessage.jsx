import React from "react";
import { useState } from "react";
import contactLogo from "../assets/contact.png";
const Composedmessage = ({ data, composepop, updateall }) => {
  const [context, setcontext] = useState(false);
  const [xyPosition, setxyPosition] = useState({ x: 0, y: 0 });
  const showcontext = (e) => {
    e.preventDefault();
    console.log("contextmenu clicked");
    let x = 0;
    let y = 0;
    if (e.pageX > 1420) {
      x = 1420;
    } else {
      x = e.pageX;
    }
    if (e.pageY > 672) {
      y = 650;
    } else {
      y = e.pageY;
    }
    const positionChange = {
      x,
      y,
    };

    console.log("this is composed X: ");
    console.log(e.pageX);
    console.log("this is  composed Y: ");
    console.log(e.pageY);
    setxyPosition(positionChange);
    setcontext(true);
  };

  const ClearCompose = () => {
    const current_title = data.title; // Assuming data.title contains the title you want to match
    const updatedata = JSON.parse(localStorage.getItem("data"));
    console.log(updatedata);
    // Iterate over updatedata to find the data with the matching title
    for (let i = 0; i < updatedata.length; i++) {
      if (updatedata[i].title === current_title) {
        // Clear the composeddata field for the corresponding title
        updatedata[i].composedata = [];
        break; // Exit the loop once the data is found and updated
      }
    }

    // Save the updated data back to localStorage
    localStorage.setItem("data", JSON.stringify(updatedata));
    updateall();
    setcontext(false);
  };

  return (
    <div>
      <div
        className=" border-2 h-[25vh] w-full relative overflow-auto "
        onContextMenu={showcontext}
        onClick={() => {
          setcontext(false);
        }}
      >
        <h1 className="w-full bg-[#0000cc] text-white pl-8 flex items-center h-8 font-bold text-lg justify-center ">
          {" "}
          {/* <img src={contactLogo} alt="" className="w-5 h-5 mr-1" /> */}
          {data.title}
        </h1>
        <div className="">
          <table className="w-full text-gray-500 ">
            <thead className=" font-normal">
              <tr className="border-b border-blue-gray-50 bg-gray-500 text-black font-bold">
                <th className="p-2 font-[500] text-left border border-black px-4 py-2">
                  No.
                </th>
                <th
                  className=" font-[500] text-left border border-black px-4 py-2"
                  colSpan={5}
                >
                  Subject
                </th>
                <th className=" font-[500] text-left border border-black px-4 py-2">
                  Sent
                </th>
                <th className=" font-[500] text-left border border-black px-4 py-2">
                  Progress
                </th>
                <th className=" font-[500] text-left border border-black px-4 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-left bg-white text-black">
              {data.composedata.map((data, index) => (
                <tr className="border-b-2 text-sm " key={index}>
                  <td
                    className=" font-[500] text-left"
                    style={{ width: "45px" }}
                  >
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal pl-2 text-left"
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td>{data.subject}</td>
                  <td style={{ width: "80px", textAlign: "center" }}>
                    {data.success}
                  </td>
                </tr>
              ))}
            </tbody>
            <tbody className="text-left bg-white text-black">
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2" colSpan={5}>
                  @gmail.com
                </td>
                <td className="border border-black px-4 py-2">60</td>
                <td className="border border-black px-4 py-2">browse</td>
                <td className="border border-black px-4 py-2">finish</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2" colSpan={5}>
                  @gmail.com
                </td>
                <td className="border border-black px-4 py-2">60</td>
                <td className="border border-black px-4 py-2">browse</td>
                <td className="border border-black px-4 py-2">finish</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2" colSpan={5}>
                  @gmail.com
                </td>
                <td className="border border-black px-4 py-2">60</td>
                <td className="border border-black px-4 py-2">browse</td>
                <td className="border border-black px-4 py-2">finish</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2" colSpan={5}>
                  @gmail.com
                </td>
                <td className="border border-black px-4 py-2">60</td>
                <td className="border border-black px-4 py-2">browse</td>
                <td className="border border-black px-4 py-2">finish</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2" colSpan={5}>
                  @gmail.com
                </td>
                <td className="border border-black px-4 py-2">60</td>
                <td className="border border-black px-4 py-2">browse</td>
                <td className="border border-black px-4 py-2">finish</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {context ? (
        <div
          className="addresscontext absolute top-0 border-2 text-white px-2 py-2 bg-slate-600 w-64 rounded-md"
          style={{ top: xyPosition.y, left: xyPosition.x }}
        >
          <div
            className="menu"
            onClick={() => composepop(true)}
            style={{ cursor: "pointer" }}
          >
            <p className=" border-2 border-[#fddd1a] px-4 py-1 w-full rounded hover:bg-[#fddd1a] hover:text-black font-semibold transition-all">
              New Compose
            </p>
          </div>

          <div
            className="menu"
            onClick={() => ClearCompose()}
            style={{ cursor: "pointer" }}
          >
            <p className=" border-2 border-[#fddd1a] px-4 py-1 w-full  mt-2   rounded hover:bg-[#fddd1a] hover:text-black font-semibold transition-all">
              Clear All Compose
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Composedmessage;
