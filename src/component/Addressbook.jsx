// import { div } from "@material-tailwind/react";
import { useState } from "react";
import contactLogo from "../assets/contact.png";
const Addressbook = ({ data, contactpop, updateall }) => {
  const TABLE_HEAD = ["No.", "Email", "Name", "Status"];
  const TABLE_HEAD1 = ["No.", "Account", "Json", "Sent"];

  const ƒ = [
    {
      name: "John ",
      job: "Manager",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },

    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [context, setcontext] = useState(false);
  const [xyPosition, setxyPosition] = useState({ x: 0, y: 0 });

  // const [datas,setData]=useState(data)

  const showcontext = (e, index) => {
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
    setSelectedItem(index);

    setcontext(true);
  };

  // if (data.data == undefined) {
  //   data = [{}];
  // }
  // console.log(data.data[2]);

  const handleRemove = () => {
    const current_title = data.title; // Assuming data.title contains the title you want to match
    const updatedata = JSON.parse(localStorage.getItem("data"));
    console.log(updatedata);
    // Iterate over updatedata to find the data with the matching title
    for (let i = 0; i < updatedata.length; i++) {
      if (updatedata[i].title === current_title) {
        // Clear the composeddata field for the corresponding title
        updatedata[i].data = [];
        break; // Exit the loop once the data is found and updated
      }
    }

    // Save the updated data back to localStorage
    localStorage.setItem("data", JSON.stringify(updatedata));
    updateall();
  };

  return (
    <div
      className="min-h-[60vh]  w-full realtive flex"
      onContextMenu={(e) => showcontext(e, selectedItem)}
      onClick={() => {
        setcontext(false);
      }}
    >
      <div className=" w-[70%]">
        <h1 className="w-full border-r-2 bg-[#0000cc] text-white justify-center text-xl font-bold pl-8 flex items-center h-8 ">
          {" "}
          {/* <img src={contactLogo} alt="" className="w-5 h-5 mr-1" /> */}
          {data.title} ({data.data.length})
        </h1>
        <table className="w-full min-w-max table-auto text-left  pt-10 border-collapse border border-gray-200">
          <thead>
            <tr className="border-b border-blue-gray-50 bg-gray-400 text-black font-bold">
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className=" bg-blue-gray-50 p-2 border border-black px-4 py-2"
                >
                  <div
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100 text-left"
                  >
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {/* <tbody>
            {data.data.map((data, index) => {
              // const isLast = index === data.length - 1;
              // const isLast = True;
              // const classes = isLast
              //   ? "p-0 border-b text-sm"
              //   : "p-0 border-b border-blue-gray-50 text-sm";
              const classes = "p-0 border-b border-blue-gray-50 text-sm";
              // console.log("mapped data is shown");
              // console.log(data);
              return (
                <tr key={index}>
                  <td className={classes} style={{ width: "30px" }}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal pl-4 text-left"
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td className={classes} style={{ width: "300px" }}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal mr-0 text-left"
                    >
                      {data.email}
                    </div>
                  </td>
                  <td className={classes} style={{ width: "30px" }}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {data.status == "success" ? (
                        <>
                          <svg
                            class="h-4 w-4 text-green-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {" "}
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </>
                      ) : null}
                      {data.status == "failure" ? (
                        <>
                          <svg
                            class="h-4 w-4 text-red-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {" "}
                            <circle cx="12" cy="12" r="10" />{" "}
                            <line x1="15" y1="9" x2="9" y2="15" />{" "}
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        </>
                      ) : null}
                    </div>
                  </td>
                  <td className={classes}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-left"
                    >
                      {data.firstName} {data.lastname}
                    </div>
                  </td>

                  <td className={classes}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-left"
                    ></div>
                  </td>
                </tr>
              );
            })}
          </tbody> */}
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">test1@gmail.com</td>
              <td className="border border-black px-4 py-2">testName</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-[30%]">
        <h1 className="w-full border-r-2 bg-[#0000cc] text-white justify-center text-xl font-bold pl-8 flex items-center h-8 ">
          {" "}
          {/* <img src={contactLogo} alt="" className="w-5 h-5 mr-1" /> */}
          {/* {data.title} ({data.data.length}) */}
          API SMTP
        </h1>
        <table className="w-full min-w-max table-auto text-left  pt-10 ">
          <thead>
            <tr className="border-b border-blue-gray-50 bg-gray-400 text-black font-bold">
              {TABLE_HEAD1.map((head, index) => (
                <th
                  key={index}
                  className=" bg-blue-gray-50 p-2 border border-black px-4 py-2"
                >
                  <div
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100 text-left"
                  >
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((data, index) => {
              // const isLast = index === data.length - 1;
              // const isLast = True;
              // const classes = isLast
              //   ? "p-0 border-b text-sm"
              //   : "p-0 border-b border-blue-gray-50 text-sm";
              const classes = "p-0 border-b border-blue-gray-50 text-sm";
              // console.log("mapped data is shown");
              // console.log(data);
              return (
                <tr key={index}>
                  <td className={classes} style={{ width: "30px" }}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal pl-4 text-left"
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td className={classes} style={{ width: "300px" }}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal mr-0 text-left"
                    >
                      {data.email}
                    </div>
                  </td>
                  <td className={classes} style={{ width: "30px" }}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {data.status == "success" ? (
                        <>
                          <svg
                            class="h-4 w-4 text-green-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {" "}
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </>
                      ) : null}
                      {data.status == "failure" ? (
                        <>
                          <svg
                            class="h-4 w-4 text-red-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {" "}
                            <circle cx="12" cy="12" r="10" />{" "}
                            <line x1="15" y1="9" x2="9" y2="15" />{" "}
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        </>
                      ) : null}
                    </div>
                  </td>
                  <td className={classes}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-left"
                    >
                      {data.firstName} {data.lastname}
                    </div>
                  </td>

                  <td className={classes}>
                    <div
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-left"
                    ></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">@gmail.com</td>
              <td className="border border-black px-4 py-2">browse</td>
              <td className="border border-black px-4 py-2">sent</td>
            </tr>
          </tbody>
        </table>
      </div>
      {context ? (
        <div
          className="addresscontext absolute top-0 z-10 border-2 text-white px-2 py-2 bg-slate-600 w-64 rounded-md"
          style={{ top: xyPosition.y, left: xyPosition.x }}
        >
          <div
            className="menu"
            onClick={() => contactpop(true)}
            style={{ cursor: "pointer" }}
          >
            <p className=" border-2 border-[#fddd1a] px-4 py-1 w-full   rounded hover:bg-[#fddd1a] hover:text-black font-semibold transition-all">
              New Contact
            </p>
          </div>

          <div
            className="menu"
            onClick={handleRemove}
            style={{ cursor: "pointer" }}
          >
            <p className="border-2 border-[#fddd1a] px-4 py-1 w-full mt-2 rounded hover:bg-[#fddd1a] hover:text-black font-semibold transition-all">
              Remove
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Addressbook;
