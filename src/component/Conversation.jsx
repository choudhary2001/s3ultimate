import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="w-full h-full ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/6 font-normal">Time</th>
              <th className="w-2/6 font-normal">subject</th>
              <th className="w-1/6 font-normal">opened</th>
              <th className="w-1/6 font-normal">clicked</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Conversation;
