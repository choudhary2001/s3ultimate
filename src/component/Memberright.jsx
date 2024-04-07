import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
let ipcRenderer;
if (window.require) {
  const electron = window.require("electron");
  ipcRenderer = electron.ipcRenderer;
}

const Memberright = ({ data, updateall }) => {
  const TABLE_HEAD = ["No.", "Name", ""];
  const [sendTestMail, setSendTestMail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [sendfrom, setSendfrom] = useState("");
  const [sendername, setSenderName] = useState("");
  const [replyto, setReplyTo] = useState("");
  const [smtpvalue, setSmtpvalue] = useState("");
  const [port, setPort] = useState("");
  const [context, setcontext] = useState(false);
  const [xyPosition, setxyPosition] = useState({ x: 0, y: 0 });
  const [addsender, setAddSender] = useState(false);
  const [value, setValue] = useState("new category");
  const [selectedOption, setSelectedOption] = useState(null);

  const [showTestPopup, setShowTestPopup] = useState(false);

  const handleTestClick = () => {
    if (username && password && sendfrom) {
      setShowTestPopup(true);
    }
  };

  const handleCancelTest = () => {
    setShowTestPopup(false);
  };

  const handleSendTest = (email) => {
    console.log('Testing with email:', email);
    setShowTestPopup(false);
  };


  const smtpOptions = [
    { value: "smtp.gmail.com", label: "Gmail", server: "smtp.gmail.com", port: 465, ssl: true, auth: true },
    { value: "smtp.mail.yahoo.com", label: "Yahoo", server: "smtp.mail.yahoo.com", port: 465, ssl: false, auth: true },
    { value: "smtp.office365.com", label: "Outlook", server: "smtp.office365.com", port: 587, ssl: false, auth: true },
    { value: "smtp.mail.me.com", label: "Apple", server: "smtp.mail.me.com", port: 587, ssl: false, auth: true },
    // Add more options as needed
  ];

  const [emailError, setEmailError] = useState("");
  const [enableAuth, setEnableAuth] = useState(false);
  const [enableSSL, setEnableSSL] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const selectedOption = localStorage.getItem("selectedOption");
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  }, []);


  const showcontext = (e) => {
    e.preventDefault();
    // console.log("contextmenu clicked");
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

    // console.log("this is X: ");
    // console.log(e.pageX);
    // console.log("this is Y: ");
    // console.log(e.pageY);
    setxyPosition(positionChange);
    setcontext(true);
  };

  const SenderInfo = {
    username,
    password,
    sendfrom,
    sendername,
    replyto,
    port,
    enableAuth,
    enableSSL,
    smtpvalue,
    success: 0
  };

  const gsenderInfo = {
    username,
    sendername,
    selectedFiles,
    success: 0
  }

  const handleAttachmentsChange = (e) => {
    const files = e.target.files[0];
    setSelectedFiles(files);
  };


  const generateRandomFilename = (originalFilename) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let filename = "";
    for (let i = 0; i < 8; i++) {
      filename += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Extract the original file extension
    const originalExtension = originalFilename.split('.').pop();

    // Append the original extension to the generated filename
    return `${filename}.${originalExtension}`;
  };


  const updatedata = JSON.parse(localStorage.getItem("data"));
  const addSenderData = async () => {
    console.log(gsenderInfo);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    const update = updatedata.filter((item) => item.title === data.title);
    let usenderinfo;
    if (selectedOption === "google") {
      usenderinfo = gsenderInfo;
      if (ipcRenderer) {
        try {
          // const { ipcRenderer } = window.require('electron');
          console.log("Electron detected. IPC Renderer available.");
          // const attachmentsWithFilenames = usenderinfo.selectedFiles.map((attachment) => ({
          //   filename: generateRandomFilename(attachment.name), // assuming 'name' contains the original filename
          //   data: attachment.path,
          // }));
          console.log(usenderinfo.selectedFiles)
          // console.log(attachmentsWithFilenames);
          // Extract filenames and data separately
          // const filenames = attachmentsWithFilenames.map((attachment) => attachment.filename);
          const filename = generateRandomFilename(usenderinfo.selectedFiles.name);
          const file_data = usenderinfo.selectedFiles.path;
          // const data = attachmentsWithFilenames.map((attachment) => attachment.data);
          const selected_category = data.title;
          await ipcRenderer.send("saveJsonFiles", { filenames: filename, data: file_data, category: selected_category });
          update[0].senderdata.push({
            username: usenderinfo.username,
            sendername: usenderinfo.sendername,
            selectedFiles: filename,
            success: 0
          });
          ipcRenderer.on('filesjsonSaved', (event, result) => {
            if (result.success) {

              console.log('Files saved successfully!');
              // Handle success in your React component
            } else {
              console.error('Error saving files:', result.error);
              // Handle error in your React component
            }
          });

          // Your Electron-specific code here using ipcRenderer
        } catch (error) {
          console.error("Error loading Electron IPC Renderer:", error);
        }
      } else {
        console.warn("Electron not detected. IPC Renderer not available.");
      }
    }
    else {
      if (!emailRegex.test(sendfrom)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      usenderinfo = SenderInfo;
      update[0].senderdata.push(usenderinfo);
    }


    localStorage.setItem("data", JSON.stringify(updatedata));
    // console.log("from addd sender");
    updateall();
    // console.log(updatedata);
    setUserName("");
    setPassword("");
    setSendfrom("");
    setSenderName("");
    setReplyTo("");
    setAddSender(false);
    setEmailError("");
  };

  const handleRemove = () => {
    const current_title = data.title; // Assuming data.title contains the title you want to match
    const updatedata = JSON.parse(localStorage.getItem("data"));
    console.log(updatedata);
    // Iterate over updatedata to find the data with the matching title
    for (let i = 0; i < updatedata.length; i++) {
      if (updatedata[i].title === current_title) {
        // Clear the composeddata field for the corresponding title
        updatedata[i].senderdata = [];
        break; // Exit the loop once the data is found and updated
      }
    }

    // Save the updated data back to localStorage
    localStorage.setItem("data", JSON.stringify(updatedata));
    updateall()
    setcontext(false);
  };

  const [loading, setLoading] = useState(false);

  const SendingTestMail = async () => {
    setLoading(true);
    localStorage.setItem("selectedMail", sendTestMail);
    setSendTestMail(sendTestMail);
    const sdata = {
      'sendername': sendername,
      'sendfrom': sendfrom,
      'username': username,
      'password': password,
      'smtpvalue': smtpvalue,
      'port': port,
      'enableSSL': enableSSL,
      'enableAuth': enableAuth
    }
    const category = data.title;
    console.log(data, category, sendTestMail)
    if (ipcRenderer) {
      await ipcRenderer.send("sendTestMail", { data: sdata, email: sendTestMail, category });
    }

  }

  useEffect(() => {
    const selectedMail = localStorage.getItem("selectedMail");
    if (selectedMail) {
      setSendTestMail(selectedMail);
    }
  }, []);

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on("sentTestMail", handleMailSent);

      return () => {
        setShowTestPopup(false);
        setLoading(false);
        ipcRenderer.removeListener("sentTestMail", handleMailSent);
      };
    }
  }, []);

  const handleMailSent = async (event, { category, success }) => {
    console.log(category, success);
    setLoading(false);
    setShowTestPopup(false);
  };

  return (
    <>
      <div
        className="h-full w-full"
        onContextMenu={showcontext}
        onClick={() => {
          setcontext(false);
        }}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.senderdata.map((data, index) => (
              <tr className="border-b border-blue-gray-50">
                <td className="text-center">{index + 1}</td>
                <td className="text-center" >{data.username} ({data.success})</td>
                {/* <td>{0}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
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
                setAddSender(true);
                setcontext(false);
              }}
            >
              New sender
            </p>

          </div>
          <div className="menu" onClick={handleRemove} style={{ cursor: "pointer" }}>
            <p className="border-2 border-[#fddd1a] px-4 py-1 w-full mt-2 rounded hover:bg-[#fddd1a] hover:text-black font-semibold transition-all">
              Remove
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {addsender ? (
        selectedOption === "smtp" ? (
          <div className="addsender fixed w-screen h-screen backdrop-blur-[1px] top-0 z-10 flex justify-center items-center ">
            <div className="container w-[600px] bg-slate-100 h-[450px] rounded-md overflow-hidden">
              <div className="w-full bg-red-500 pt-2 h-10 flex justify-between px-4">
                <p style={{ color: "white" }}> Add New Sender</p>
                <p
                  className=" cursor-pointer"
                  onClick={() => setAddSender(false)}
                >
                  X
                </p>
              </div>
              <div className=" w-full">
                {/* <div className="topbtn flex w-full  py-2 px-4 gap-5">
                  <p className=" border-2 px-3 bg-white rounded ">smtp server</p>
                  <p className=" border-2 px-3 bg-white rounded ">pop3</p>
                  <p className=" border-2 px-3 bg-white rounded ">Advance</p>
                </div> */}

                {/* smtp  */}
                <div className="container w-full  h-[auto] p-4 ">
                  <div className="flex  gap-8 justify-center bg-white px-4 py-2">
                    {/* <p>SMTP Server</p> */}
                    <p>SMTP server</p>
                    <select
                      name=""
                      id=""
                      className="border-2 px-3 w-[300px]"
                      value={smtpvalue}
                      onChange={(e) => {
                        setSmtpvalue(e.target.value);
                        const selectedOption = smtpOptions.find((option) => option.value === e.target.value);
                        if (selectedOption) {
                          setPort(selectedOption.port);
                          setEnableSSL(selectedOption.ssl);
                          setEnableAuth(selectedOption.auth);
                        }
                      }}
                    >
                      <option value="">Select Smtp</option>
                      {smtpOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full bg-white p-2 flex gap-4 justify-center">
                    <div className="flex gap-2">
                      <p>PORT</p>
                      <input
                        type="number"
                        name=""
                        id=""
                        className="border-2 border-blue-950"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                      />
                    </div>
                    <div className="border-2 px-3 rounded border-blue-950">
                      Default
                    </div>
                  </div>
                  <div className="w-full gap-2 bg-white  p-2 flex justify-evenly ">
                    <div className="flex gap-2 ">
                      <input type="checkbox" name="enableAuth"
                        id="enableAuth"
                        checked={enableAuth}
                        onChange={() => setEnableAuth(!enableAuth)} />
                      <p>Enable Authentication</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="enableSSL"
                        id="enableSSL"
                        checked={enableSSL}
                        onChange={() => setEnableSSL(!enableSSL)} />
                      <p>Enable SSL/Tls</p>
                    </div>
                  </div>
                  <div className=" bg-white p-4">
                    <div className="px-4 flex justify-end mb-4 mr-4">
                      <label htmlFor="" className="mr-2">
                        Username :
                      </label>
                      <input
                        type="email"
                        className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="px-4 flex justify-end mb-4 mr-4">
                      <label htmlFor="" className="mr-2">
                        Password :
                      </label>
                      <input
                        type="text"
                        className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="px-4 flex justify-end mb-4 mr-4">
                      <label htmlFor="" className="mr-2">
                        Send from :
                      </label>
                      <input
                        type="text"
                        className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
                        value={sendfrom}
                        onChange={(e) => setSendfrom(e.target.value)}
                      />
                    </div>
                    <div className="px-4 flex justify-end mb-4 mr-4">
                      <label htmlFor="" className="mr-2">
                        Sender name :
                      </label>
                      <input
                        type="text"
                        className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
                        value={sendername}
                        onChange={(e) => setSenderName(e.target.value)}
                      />
                    </div>
                    {/* <div className="px-4 flex justify-end mb-4 mr-4">
                      <label htmlFor="" className="mr-2">
                        Reply - to :
                      </label>
                      <input
                        type="text"
                        className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
                        value={replyto}
                        onChange={(e) => setReplyTo(e.target.value)}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-evenly pb-25">
                <p
                  className=" bg-red-500 px-3  py-1 rounded cursor-pointer " style={{ color: "white" }}
                  onClick={() => setAddSender(false)}
                >
                  Cancel{" "}
                </p>
                <p
                  className=" bg-red-500 px-3  py-1 rounded cursor-pointer " style={{ color: "white" }}
                  onClick={handleTestClick}
                >
                  Test
                </p>
                <p
                  className=" bg-green-600 px-3  py-1 rounded cursor-pointer" style={{ color: "white" }}
                  onClick={addSenderData}
                >
                  Add Sender
                </p>
              </div>
            </div>
          </div>
        ) :
          (
            <div className="addsender fixed w-screen h-screen backdrop-blur-[1px] top-0 z-10 flex justify-center items-center ">
              <div className="container w-[600px] bg-slate-100 h-[auto] rounded-md overflow-hidden">
                <div className="w-full bg-red-500 pt-2 h-[auto] flex justify-between px-4">
                  <p style={{ color: "white" }}>Add new API</p>
                  <p
                    className=" cursor-pointer"
                    onClick={() => setAddSender(false)}
                  >
                    X
                  </p>
                </div>
                <div className=" w-full">

                  {/* smtp  */}
                  <div className="container w-full  h-[auto] p-4 ">
                    <div className=" bg-white p-4">
                      <div className="px-4 flex justify-end mb-4 mr-4">
                        {/* <p>SMTP Server</p> */}
                        <label htmlFor="" className="mr-2">
                          Upload JSON File :
                        </label>
                        <input type="file" name="file" accept=".json" onChange={handleAttachmentsChange} />
                      </div>

                      <div className="px-4 flex justify-center mb-4 mr-4">
                        <label htmlFor="" className="mr-2">
                          Sender Email :
                        </label>
                        <input
                          type="email"
                          className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>


                      <div className="px-4 flex justify-center mb-4 mr-4">
                        <label htmlFor="" className="mr-2">
                          Sender name :
                        </label>
                        <input
                          type="text"
                          className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
                          value={sendername}
                          onChange={(e) => setSenderName(e.target.value)}
                        />
                      </div>

                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-evenly pb-25">
                  <p
                    className=" bg-red-500 px-3  py-1 rounded cursor-pointer " style={{ color: "white" }}
                    onClick={() => setAddSender(false)}
                  >
                    Cancel{" "}
                  </p>


                  <p
                    className=" bg-green-600 px-3  py-1 rounded cursor-pointer" style={{ color: "white" }}
                    onClick={addSenderData}
                  >
                    Add API
                  </p>
                </div>
              </div>
            </div>
          )
      ) : (
        <></>
      )}

      {showTestPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">

          <div className="addcategory fixed w-screen h-screen backdrop-blur-[1px] top-0 z-10 flex justify-center items-center ">
            <div className="container w-[400px] bg-slate-200 h-[150px] rounded-md overflow-hidden">
              <div className="w-full bg-red-500 pt-2 h-10 flex justify-between px-4">
                <p style={{ color: "white" }}>Send Test Mail</p>
                <p
                  className=" cursor-pointer"
                  onClick={handleCancelTest}
                >
                  X
                </p>
              </div>
              <div className=" w-full flex justify-evenly mt-4">
                <label htmlFor="newcategory">
                  Enter Email Address
                </label>
                <input
                  type="text"
                  className="px-2 py-1 rounded border-2 border-slate-400  "
                  value={sendTestMail}
                  onChange={(e) => setSendTestMail(e.target.value)}
                />
              </div>
              <div className="flex w-full justify-evenly mt-4">
                <p
                  className=" bg-red-500 px-3 rounded cursor-pointer py-1 " style={{ color: "white" }}
                  onClick={handleCancelTest}
                >
                  Cancel{" "}
                </p>
                <p
                  className=" bg-green-600 px-3 rounded cursor-pointer py-1" style={{ color: "white" }}
                  onClick={SendingTestMail}
                >
                  {loading ? 'Sending...' : 'Send Test Mail'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Memberright;
