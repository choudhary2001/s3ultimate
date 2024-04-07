import React, { useState } from "react";

const Generalsetting = ({ data, updateall }) => {
  const [delay, setDelay] = useState(data.delay);
  let storedData = JSON.parse(localStorage.getItem("data")) || [];

  const handleDelayChange = (event) => {
    const updatedData = storedData.map(item => {
      if (item.title === data.title) {
        return { ...item, delay: event.target.value };
      }
      return item;
    });

    localStorage.setItem("data", JSON.stringify(updatedData));
    setDelay(event.target.value);
    updateall();
  };

  console.log(storedData)
  return (
    <>
      <div className="w-[96%] h-[80%] bg-white  rounded-lg p-1 ">
        {/* <div className="w-full h-6 flex px-6 justify-between mb-2 mt-2">
          <div>Auto config</div>
          <div>
            <select className="h-full w-[200px] border-2 border-gray-500 ">
              <option value="fruit">Fruit</option>

              <option value="vegetable">Vegetable</option>

              <option value="meat">Meat</option>
            </select>
          </div>
        </div>
        <div className="w-full h-6 flex px-6 justify-between mb-2">
          <div>Connection</div>
          <div>
            <select className="h-full w-[200px] border-2 border-gray-500 ">
              <option value="fruit">Fruit</option>

              <option value="vegetable">Vegetable</option>

              <option value="meat">Meat</option>
            </select>
          </div>
        </div>
        <div className="w-full h-6 flex px-6 justify-between mb-2">
          <div>Wait Before Sending</div>
          <div>
            <input
              type="text"
              className="h-full w-[150px] border-2 border-gray-600 "
            />
          </div>
        </div>
        <div className="w-full h-6 flex px-6 justify-between mb-2">
          <div>Wait Before Sending</div>
          <div>
            <input
              type="text"
              className="h-full w-[150px] border-2 border-gray-600 "
            />
          </div>
        </div> */}
        <div className="w-full h-6 flex px-6 justify-between mb-2">
          <div>Delay (in Seconds)</div>
          <div>
            <input
              type="number" value={delay}
              className="h-full w-[150px] border-2 border-gray-600 "
              onChange={handleDelayChange}
            />
          </div>
        </div>
        {/* <div className="w-full h-6 flex px-6 justify-between mb-2">
          <div>Wait Before Sending</div>
          <div>
            <input
              type="text"
              className="h-full w-[150px] border-2 border-gray-600 "
            />
          </div>
        </div>
        <div className="w-full h-6 flex px-6 justify-between mb-2">
          <div>Wait Before Sending</div>
          <div>
            <input
              type="text"
              className="h-full w-[150px] border-2 border-gray-600 "
            />
          </div>
        </div>
        <div className="w-full h-6 flex px-6 justify-between mb-2">
          <div>Wait Before Sending</div>
          <div>
            <input
              type="text"
              className="h-full w-[150px] border-2 border-gray-600 "
            />
          </div>
        </div>
        <div className="w-full  flex justify-center px-6 text-sm font-semibold text-gray-400">
          <p>
            Lorem ipsum dolor sit amet consectetur adipic sicing elit. Nisi,
            sint.
          </p>
        </div>
        <div className="w-full h-8 flex bg-gray-100 justify-evenly items-center">
          <div>
            {" "}
            <span>*</span>premium version
          </div>
          <div>config domain</div>
        </div>
        <div className="mt-2">
          <div className=" ml-4 flex items-center  pl-4">
            {" "}
            <input
              type="checkbox"
              name="check1"
              id=""
              className="w-6 h-4"
            />{" "}
            track who reading email
          </div>
          <div className="ml-4 flex items-center h-6  pl-4">
            {" "}
            <input type="checkbox" name="check1" id="" className="w-6 h-4" />
            track who reading email
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Generalsetting;
