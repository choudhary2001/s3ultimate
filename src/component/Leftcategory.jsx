import React, { useEffect, useState } from "react";
import fileLogo from "../assets/files.png";
const Leftcategory = ({ setdata }) => {
  // const Data = [
  //   {
  //     title: "Address Book ",
  //     data: [
  //       {
  //         email: "amankant@gmail.com",
  //       },
  //       {
  //         email: "raman@gmail.com",
  //       },
  //     ],
  //   },
  // ];
  const [Data, setData] = useState([]);
  const [value, setValue] = useState(" ");
  const addNewCategory = () => {
    setAddCategory(false);
    console.log(value);
    let getdata = localStorage.getItem("data");
    console.log(getdata);
    let data = [
      ...Data,
      { title: value, data: [], composedata: [], senderdata: [] },
    ];
    setData(data);
    // localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(data));
    // localStorage.removeItem("data");
    setValue("");
  };
  useEffect(() => {
    console.log(localStorage.getItem("data"));
    setData(JSON.parse(localStorage.getItem("data")));
  }, [value]);

  const [context, setcontext] = useState(false);
  const [xyPosition, setxyPosition] = useState({ x: 0, y: 0 });
  const [addcategory, setAddCategory] = useState(false);
  const datatoparent = (title) => {
    console.log("sending data to parent");
    console.log(title);
    let datas = Data.filter((item) => item.title === title);
    console.log(datas);
    setdata(datas);
  };
  const showcontext = (e) => {
    e.preventDefault();
    console.log("contextmenu clicked");
    let x = 0;
    if (e.pageX > 1420) {
      x = 1420;
    } else {
      x = e.pageX;
    }
    const positionChange = {
      x,
      y: e.pageY,
    };

    console.log("this is X: ");
    console.log(e.pageX);
    console.log("this is Y: ");
    console.log(e.pageY);
    setxyPosition(positionChange);
    setcontext(true);
  };
  return (
    <>
      <div
        className="category  w-full h-full bg-white pt-5"
        onContextMenu={showcontext}
        onClick={() => {
          setcontext(false);
        }}
      >
        {Data.map((data) => (
          <div
            className="flex ml-4 h-4 items-center mb-2 cursor-pointer "
            key={data}
          >
            {/* <p className="mr-1">--</p> */}
            <div>
              <img src={fileLogo} alt="" className=" w-5 mr-1" />
            </div>
            <div onClick={() => datatoparent(data.title)}>
              {data.title}({ })
            </div>
          </div>
        ))}
      </div>
      {context ? (
        <div
          className="addresscontext absolute top-0 z-10 border-2 text-black px-0   w-64 rounded-md"
          style={{ top: xyPosition.y, left: xyPosition.x }}
        >
          <div className="menu">
            <p
              className=" border-2 border-[#fddd1a] px-4 py-1 w-full    rounded hover:bg-[#fddd1a] hover:text-black font-semibold transition-all cursor-pointer"
              onClick={() => {
                setAddCategory(true);
                setcontext(false);
              }}
            >
              New Category
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {addcategory ? (
        <div className="addcategory fixed w-screen h-screen backdrop-blur-[1px] top-0 z-10 flex justify-center items-center ">
          <div className="container w-[400px] bg-slate-100 h-[150px] rounded-md overflow-hidden">
            <div className="w-full bg-red-500 pt-2 h-10 flex justify-between px-4">
              <p style={{ color: "white" }}>Add New Category</p>
              <p
                className=" cursor-pointer"
                onClick={() => setAddCategory(false)}
              >
                X
              </p>
            </div>
            <div className=" w-full flex justify-evenly mt-4">
              <label htmlFor="newcategory">Enter category name</label>
              <input
                type="text"
                className="px-2 py-1 rounded"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex w-full justify-evenly mt-4">
              <p
                className=" bg-red-500 px-3 rounded cursor-pointer " style={{ color: "white" }}
                onClick={() => setAddCategory(false)}
              >
                Cancel{" "}
              </p>
              <p
                className=" bg-green-600 px-3 rounded cursor-pointer" style={{ color: "white" }}
                onClick={addNewCategory}
              >
                Add category
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Leftcategory;
