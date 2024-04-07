import React from 'react'

const Inputfield = ({label}) => {
  return (
    <div className="px-4 flex justify-end mb-4 mr-4">
      <label htmlFor="" className="mr-2">
        {label} :{" "}
      </label>
      <input
        type="text"
        className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
      />
    </div>
  );
}

export default Inputfield
