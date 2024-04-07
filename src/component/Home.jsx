import React, { useEffect, useState } from "react";
import Mainnav from "./Mainnav";
import fileLogo from "../assets/files.png";
import Leftcategory from "./Leftcategory";
import Memberright from "./Memberright";
import Addressbook from "./Addressbook";
import Composedmessage from "./Composedmessage";
import Bottombar from "./Bottombar";

import NewContactpopup from "./NewContactpopup";
import AppSetting from "./AppSetting";
import ImportData from "./ImportData";
import Emailcollectorpopup from "./Emailcollectorpopup";
import Contextmenu from "./Contextmenu";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Compose from "./Compose";
import Signin from "./Signin";

let ipcRenderer;
if (window.require) {
  const electron = window.require("electron");
  ipcRenderer = electron.ipcRenderer;
}

// import { ChevronDownIcon } from "@heroicons/react/20/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// const useCustomEffect = () => {
//   useEffect(() => {
//     console.log("useCustomEffect ran");
//     // Additional side effects or logic can be added here
//   }, []);
// };

const Home = () => {
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [publicIp, setPublicIp] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [category, setCategory] = useState(true);
  const [contact, setContact] = useState(false);
  const [appsetting, setAppsetting] = useState(false);
  const [importdata, setImportdata] = useState(false);
  const [emailcollector, setEmailcollector] = useState(false);
  const [compose, setCompose] = useState(false);
  const [Title, setTitle] = useState("Home");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const BASE_API_URL = "https://brahmastra.site/";
  const loginUrl = `${BASE_API_URL}accounts/login/`;
  const verifyUrl = `${BASE_API_URL}two_step`;
  const verifyRefreshTokenUrl = `${BASE_API_URL}verify-refresh-token/`;
  const countriesApiUrl = "https://restcountries.com/v2/all"; // Use a proper countries API
  const [countries, setCountries] = useState([]);

  let initdata = JSON.parse(localStorage.getItem("data"));
  //console.log(initdata);
  if (initdata === null) {
    let data = [
      { title: "Home", data: [], composedata: [], senderdata: [], delay: 0 },
    ];
    localStorage.setItem("data", JSON.stringify(data));
  }

  async function getPublicIp() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const ipdata = await response.json();
      setPublicIp(ipdata.ip);
      return ipdata.ip;
    } catch (error) {
      console.error("Error getting public IP:", error);
      return null;
    }
  }

  // Example usage
  getPublicIp().then((ip) => {
    console.log("Public IP address:", ip);
  });

  const fetchData = async () => {
    try {
      const BASE_API_URL = "https://brahmastra.site/";
      const loginToken = localStorage.getItem("loginToken");
      const storedDataString = localStorage.getItem("loginToken");
      const storedData = JSON.parse(storedDataString);
      if (storedData) {
        const access_token = storedData.access_token;
        console.log(access_token);
        if (access_token) {
          const response = await fetch(`${BASE_API_URL}home/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
            console.log(data);
            console.log("Email data posted successfully to API.");
          } else {
            console.error(
              "Failed to post email data to API:",
              response.statusText
            );
          }
        }
      }
    } catch (error) {
      console.error("Error while posting email data to API:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Fetch countries when the component mounts
    fetch(countriesApiUrl)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    // Check for the presence of loginToken in localStorage
    const loginToken = localStorage.getItem("loginToken");
    const storedDataString = localStorage.getItem("loginToken");

    // console.log(loginToken);
    // Parse the stored string to get the object
    const storedData = JSON.parse(storedDataString);
    if (storedData) {
      const refresh_token = storedData.refresh_token;
      // console.log(refresh_token);
      if (refresh_token) {
        // If loginToken is present, verify the refresh token
        verifyRefreshToken(refresh_token);
      }
    }
    // Access the refresh_token property
  }, []); // Run this effect only once on component mount

  const verifyRefreshToken = async (refreshToken) => {
    try {
      let userIp = null;
      getPublicIp().then((ip) => {
        console.log("Public IP address:", ip);
        userIp = ip;
      });

      const response = await fetch(verifyRefreshTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          user_ip: userIp,
        }),
      });

      const data = await response.json();
      //console.log(data)
      if (response.status === 200) {
        // Verification successful, navigate to Home
        // alert("verified");
        setShowOtpVerification(true);
      } else {
        // Verification failed, remove loginToken from localStorage
        // localStorage.removeItem("loginToken");
      }
    } catch (error) {
      console.error("Error during refresh token verification:", error);
    }
  };

  const [mainData, setMainData] = useState(
    JSON.parse(localStorage.getItem("data"))
  );

  //console.log("this is from home through //console");
  console.log(JSON.parse(localStorage.getItem("data")));

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      setSelectedCountry(savedCountry);
    }
    const selectedOption = localStorage.getItem("selectedOption");
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  }, []);

  // useEffect(() => {
  //   setMainData(JSON.parse(localStorage.getItem("data")));
  // }, [compose, contact]);

  const categoryHandle = () => {
    setCategory(true);
  };
  const memberHandle = () => {
    setCategory(false);
  };
  // console.log("from home after setting maindata");
  // console.log(mainData);
  // ------------------------------------------------------  left category
  const [Data, setData] = useState([]);
  const [value, setValue] = useState("");

  const addNewCategory = () => {
    setAddCategory(false);
    //console.log(value);
    let getdata = localStorage.getItem("data");
    //console.log(getdata);

    const isDuplicate = Data.some((item) => item.title === value);

    if (isDuplicate) {
      console.warn("Duplicate value found. Not adding to Data.");
      return; // Abort if the value already exists
    }

    // const isElectron = window && window.require;

    if (ipcRenderer) {
      try {
        // const { ipcRenderer } = window.require('electron');
        //console.log("Electron detected. IPC Renderer available.");
        ipcRenderer.send("addCategory", { categoryName: value });

        // Your Electron-specific code here using ipcRenderer
      } catch (error) {
        console.error("Error loading Electron IPC Renderer:", error);
      }
    } else {
      console.warn("Electron not detected. IPC Renderer not available.");
    }
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
    // console.log(localStorage.getItem("data"));
    setData(JSON.parse(localStorage.getItem("data")));
  }, [value, mainData]);

  const [update, setUpdate] = useState(false);
  // let datafromupdate = "";
  const UpdateAll = () => {
    console.log("this is from updateall ..............");
    //console.log("updatint set update from func");
    setUpdate(true);
    fetchData();
    // console.log("after updating mainData");
    // console.log(mainData); // This may still not reflect the updated state immediately
  };
  useEffect(() => {
    //console.log("use effect run on update");
    // Filter data based on condition
    let localdata = JSON.parse(localStorage.getItem("data"));
    let datas = localdata.filter((item) => item.title === Title);
    //console.log("this is filtered data from update all useEffect");
    //console.log(datas);

    // Update mainData state with filtered data
    setMainData(datas);
    setUpdate(false);
  }, [update]);

  //console.log("maindata in outside the function");
  //console.log(mainData[0]);

  const [context, setcontext] = useState(false);
  const [xyPosition, setxyPosition] = useState({ x: 0, y: 0 });
  const [addcategory, setAddCategory] = useState(false);

  const datatoparent = (title) => {
    //console.log("sending data to parent");
    setTitle(title);
    //console.log(title);
    let datas = Data.filter((item) => item.title === title);
    // console.log(datas);
    setMainData(datas);
  };

  const showcontext = (e) => {
    e.preventDefault();
    //console.log("contextmenu clicked");
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

    //console.log("this is X: ");
    //console.log(e.pageX);
    //console.log("this is Y: ");
    //console.log(e.pageY);
    setxyPosition(positionChange);
    setcontext(true);
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    localStorage.removeItem("loginToken");

    // For example, redirect to the login page
    // window.location.href = '/login';
    window.location.reload();
  };

  console.log(mainData);

  const clearData = () => {
    // Get the current loginToken value
    const loginToken = localStorage.getItem("loginToken");
    const selectedMail = localStorage.getItem("selectedMail");
    let storedData = JSON.parse(localStorage.getItem("data")) || [];

    if (ipcRenderer) {
      try {
        console.log("Electron detected. IPC Renderer available.");
        const category = mainData[0].title;
        ipcRenderer.send("deleteAllData", {
          data: storedData,
          category: category,
        });
      } catch (error) {
        console.error("Error loading Electron IPC Renderer:", error);
      }
    } else {
      console.warn("Electron not detected. IPC Renderer not available.");
    }

    const filteredData = storedData.filter(
      (item) => item.title !== mainData[0].title
    );
    localStorage.clear();

    if (filteredData.length === 0) {
      let defaultData = [
        { title: "Home", data: [], composedata: [], senderdata: [], delay: 0 },
      ];
      localStorage.setItem("data", JSON.stringify(defaultData));
      setMainData(defaultData);
    } else {
      setMainData(filteredData);
    }

    // Restore the loginToken
    localStorage.setItem("loginToken", loginToken);
    localStorage.setItem("selectedMail", selectedMail);
    UpdateAll();
    window.location.reload();
  };

  // left category end
  return (
    <>
      {/* popu upp container   */}
      {contact ? (
        <NewContactpopup
          display={() => setContact(false)}
          data={mainData[0]}
          updateall={UpdateAll}
        />
      ) : (
        <></>
      )}
      {appsetting ? (
        <AppSetting
          display={() => setAppsetting(false)}
          data={mainData[0]}
          updateall={UpdateAll}
        />
      ) : (
        <></>
      )}
      {importdata ? (
        <ImportData
          data={mainData[0]}
          updateall={UpdateAll}
          display={() => setImportdata(false)}
        />
      ) : (
        <></>
      )}
      {compose ? (
        <Compose display={() => setCompose(false)} updateall={UpdateAll} />
      ) : (
        <></>
      )}
      {emailcollector ? (
        <Emailcollectorpopup display={() => setEmailcollector(false)} />
      ) : (
        <></>
      )}

      {/* <AppSetting/> */}
      {/* <ImportData/> */}
      {/* <Emailcollectorpopup/> */}
      {/* <Contextmenu/> */}
      {/* popu upp container  end  */}
      <div className="w-full h-[100vh]  ">
        {/* topnav */}
        {/* <div className="w-full h-[45px] bg-[#f45363f7] fixed">
          <div className="flex gap-5  font-serif items-center h-full ml-5 ">
            <button className="text-sm hover:border-b-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm text-gray-900 hover:bg-[#fddd1a]">
                    File
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            License
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </button>
            <button className="text-sm hover:border-b-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm text-gray-900 hover:bg-[#fddd1a]">
                    Edit
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            License
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </button>
            <button className="text-sm  hover:border-b-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm  text-gray-900 hover:bg-[#fddd1a]">
                    Tools
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            License
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </button>
            <button className="text-sm hover:border-b-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm text-gray-900 hover:bg-[#fddd1a]">
                    Help
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            +999999999999
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Telegram
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            FaceBook
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Website
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </button>
            <button className="text-sm hover:border-b-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm text-gray-900 hover:bg-[#fddd1a]">
                    Languages
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  z-30  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            License
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </button>
            <button className="text-sm hover:border-b-0" onClick={clearData}>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm text-gray-900 hover:bg-[#fddd1a]">
                    Clear All Files
                  </Menu.Button>
                </div>
              </Menu>
            </button>
            <button className="text-sm hover:border-b-0" onClick={handleLogout}>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm text-gray-900 hover:bg-[#fddd1a]">
                    LogOut
                  </Menu.Button>
                </div>
              </Menu>
            </button>
            <button className="text-sm hover:border-b-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 text-sm text-gray-900 bg-[#fddd1a]">
                    {profileData && (
                      <p className="ml-4 text-sm text-gray-900">
                        {profileData.full_name}
                        {profileData.credit_limit ? ` (${profileData.credit_limit} remaining credit)` : ''}
                      </p>
                    )}

                  </Menu.Button>
                </div>
              </Menu>
            </button>

          </div>

        </div> */}
        <div className="overflow-hidden">
          {/* main nav  */}
          <Mainnav
            appsettingpop={() => setAppsetting(true)}
            contactpop={() => setContact(true)}
            emailcollectpop={() => setEmailcollector(true)}
            importdatapop={() => setImportdata(true)}
            composedatapop={() => setCompose(true)}
            data={mainData[0]}
            updateall={UpdateAll}
            profileData={profileData}
          />
        </div>
        {/* body content  */}
        <div className="maincontent w-[100%] h-[auto]  flex">
          {/* left */}
          <div className="left h-full bg-white min-w-[220px]">
            <div className="head w-full h-8 bg-[#0000cc] ">
              <div className="h-full flex gap-2">
                <div
                  className="flex  h-full  items-center p-2 cursor-pointer"
                  onClick={categoryHandle}
                >
                  {/* <div>
                    <img src={fileLogo} alt="" className=" w-5 mr-1" />
                  </div> */}
                  <div className="text-white">Category({Data.length})</div>
                </div>
                {/* <div
                  className="flex  h-full  items-center p-2 cursor-pointer text-white "
                  onClick={memberHandle}
                >
                  {selectedOption == "google" ? (
                    <>
                      <div>
                        <img
                          style={{}}
                          width="16"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV2R_whc53L-Aygh8JgDx-dNd4B7plcEiS7w&usqp=CAU"
                        />
                      </div>
                      &nbsp;
                      <div>
                        {selectedOption == "google" ? "Google API" : "SMTP"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <img
                          width="18"
                          src="data:image/png;base64,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"
                        />
                      </div>
                      &nbsp;
                      <div>
                        {selectedOption == "google" ? "Google API" : "SMTP"}
                      </div>
                    </>
                  )}
                </div> */}
              </div>
            </div>
            <div className="leftbody h-[76.5vh]">
              {/* {left category} */}
              {/* <Leftcategory/> */}
              {/* sender email  */}
              {category ? (
                // <Leftcategory setdata={setMainData} />
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
                        className="flex ml-2  items-center  cursor-pointer hover:bg-slate-400 p-1"
                        key={data.title}
                        onClick={() => datatoparent(data.title)}
                      >
                        {/* <p className="mr-1">--</p> */}
                        {/* <div>
                          <img src={fileLogo} alt="" className=" w-5 mr-1" />
                        </div> */}
                        <div>{data.title}</div>
                      </div>
                    ))}
                    {/* <div className="flex ml-4 h-4 items-center mb-2">
                      <div>
                        <img src={fileLogo} alt="" className=" w-5 mr-1" />
                      </div>
                      <div>Address Book (1)</div>
                    </div>
                    <div className="flex ml-2 h-4 items-center mb-2">
                      <p className="mr-1">--</p>
                      <div>
                        <img src={fileLogo} alt="" className=" w-5 mr-1" />
                      </div>
                      <div>Company (2)</div>
                    </div>
                    <div className="flex ml-2 h-4 items-center mb-2">
                      <p className="mr-1">--</p>
                      <div>
                        <img src={fileLogo} alt="" className=" w-5 mr-1" />
                      </div>
                      <div>Sample (0)</div>
                    </div> */}
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
                      <div className="container w-[400px] bg-slate-200 h-[150px] rounded-md overflow-hidden">
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
                          <label htmlFor="newcategory">
                            Enter category name
                          </label>
                          <input
                            type="text"
                            className="px-2 py-1 rounded border-2 border-slate-400  "
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                        <div className="flex w-full justify-evenly mt-4">
                          <p
                            className=" bg-red-500 px-3 rounded cursor-pointer py-1 "
                            style={{ color: "white" }}
                            onClick={() => setAddCategory(false)}
                          >
                            Cancel{" "}
                          </p>
                          <p
                            className=" bg-green-600 px-3 rounded cursor-pointer py-1"
                            style={{ color: "white" }}
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
              ) : (
                <div className="h-full w-full bg-white memberright">
                  <Memberright data={mainData[0]} updateall={UpdateAll} />
                </div>
              )}
            </div>
          </div>
          {/* right  */}
          <div className="right flex-grow h-full bg-white mr-2 overflow-hidden">
            <div className=" h-[70%] bg-white overflow-auto addressbook">
              <div className="  min-h-full  bg-white min-w-[1000px] border-2">
                <Addressbook
                  data={mainData[0]}
                  contactpop={setContact}
                  updateall={UpdateAll}
                />
              </div>
            </div>
            <div className="h-[30%] bg-white">
              <Composedmessage
                data={mainData[0]}
                composepop={setCompose}
                updateall={UpdateAll}
              />
            </div>
          </div>
        </div>
        {/* bottom border  */}
        {/* <div className="h-8 bg-[#f45363f9] w-full">
          <div className="h-full w-full overflow-hidden">
            <Bottombar
              data={mainData[0]}
              updateall={UpdateAll}
              profileData={profileData}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
