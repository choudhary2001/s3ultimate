import React, { useState, useEffect } from "react";
import { NavButtons } from "./Buttons";
import contactLogo from "../assets/contact.png";
import fileLogo from "../assets/files.png";
import emailLogo from "../assets/email.png";
import playLogo from "../assets/play.png";
import composeLogo from "../assets/compose.png";

let ipcRenderer;

const Mainnav = ({
  appsettingpop,
  contactpop,
  importdatapop,
  emailcollectpop,
  composedatapop,
  data,
  updateall,
  profileData
}) => {
  const [categoriesSendingMails, setCategoriesSendingMails] = useState([]);
  const [liveMailStatus, setLiveMailStatus] = useState([]);
  const [totalMailsSends, setTotalMailsSends] = useState(data.data ? data.data.map(category => ({ category, success_count: 0 })) : []);
  const [lastSuccessfullEmail, setLastSuccessfullEmail] = useState(null);
  const [showTestPopup, setShowTestPopup] = useState(false);

  const [categorytype, setType] = useState('')

  if (window.require) {
    const electron = window.require("electron");
    ipcRenderer = electron.ipcRenderer;

    useEffect(() => {
      // Listen for "mailSent" and "allMailsSent" events
      ipcRenderer.on("mailSent", handleMailSent);
      ipcRenderer.on("allMailsSent", handleAllMailsSent);

      // Cleanup the event listeners on component unmount
      return () => {
        ipcRenderer.removeListener("mailSent", handleMailSent);
        ipcRenderer.removeListener("allMailsSent", handleAllMailsSent);
      };
    }, []);
  }

  // Function to toggle sendingEmails flag
  const toggleSendingEmails = (startSending) => {
    ipcRenderer.send('toggleSendingEmails', startSending);
  };

  const stopSending = () => {
    // Toggle sendingEmails flag
    toggleSendingEmails(false); // Stop sending emails
    updateall();
  };

  const sendMail = () => {
    toggleSendingEmails(true);
    setShowTestPopup(false);
    const selectedOption = localStorage.getItem("selectedOption");
    const selectedCategory = data.title;

    if (profileData && profileData.credit_limit !== null && profileData.credit_limit < 1) {
      return;
    }


    // Set the status of all emails to null before sending
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    const categoryData = storedData.find(item => item.title === selectedCategory);

    if (categoryData) {
      categoryData.data.forEach(emailData => {
        emailData.status = null;
      });
      localStorage.setItem("data", JSON.stringify(storedData));
    }

    updateall();

    // Initialize success_count to 0 in localStorage
    const storedCategories = JSON.parse(localStorage.getItem("totalMailsSends")) || {};
    localStorage.setItem("totalMailsSends", JSON.stringify({
      ...storedCategories,
      [selectedCategory]: 0,
    }));

    if (ipcRenderer) {
      if (selectedOption === "google" || selectedOption === "smtp") {
        try {
          const initdata = JSON.parse(localStorage.getItem("data"));
          console.log("Electron detected. IPC Renderer available.");
          const category = data.title;

          setCategoriesSendingMails((prevCategories) => {
            // Ensure prevCategories is initialized as an array
            prevCategories = prevCategories || [];

            // Filter the array
            return prevCategories.filter((prevCategory) => prevCategory !== category);
          });

          if (selectedOption === "google") {
            ipcRenderer.send("sendGoogleMailData", { data: initdata, category: category });
          } else if (selectedOption === "smtp") {
            ipcRenderer.send("sendMailData", { data: initdata, category: category });
          }

          setLiveMailStatus((prevStatus) => [
            ...prevStatus,
            { email: null, category: category, status: "sending" },
          ]);
        } catch (error) {
          console.error("Error loading Electron IPC Renderer:", error);
        }
      }
    } else {
      console.warn("Electron not detected. IPC Renderer not available.");
    }
  };

  const sendGmassMail = () => {
    toggleSendingEmails(true);
    setShowTestPopup(true);
    setType('Gmass');
    const selectedOption = localStorage.getItem("selectedOption");
    const selectedCategory = data.title;

    if (profileData && profileData.credit_limit !== null && profileData.credit_limit < 1) {
      return;
    }


    // Set the status of all emails to null before sending
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    const categoryData = storedData.find(item => item.title === selectedCategory);


    updateall();

    // Initialize success_count to 0 in localStorage
    const storedCategories = JSON.parse(localStorage.getItem("totalMailsSends")) || {};
    localStorage.setItem("totalMailsSends", JSON.stringify({
      ...storedCategories,
      [selectedCategory]: 0,
    }));

    if (ipcRenderer) {
      if (selectedOption === "google" || selectedOption === "smtp") {
        try {
          const initdata = JSON.parse(localStorage.getItem("data"));
          console.log("Electron detected. IPC Renderer available.");
          const category = data.title;

          for (let i = 0; i < initdata.length; i++) {
            if (initdata[i].title === category) {
              // Clear the composeddata field for the corresponding title
              initdata[i].data = [{ email: 'ajaygoel999@gmail.com' }, { email: 'ajay@parttimesnob.com' }, { email: 'test@chromecompete.com' }, { email: 'ajay@ajaygoel.net' }, { email: 'test@ajaygoel.org' }, { email: 'me@dropboxslideshow.com' }, { email: 'test@wordzen.com' }, { email: 'rajgoel8477@gmail.com' }, { email: 'rajanderson8477@gmail.com' }, { email: 'rajwilson8477@gmail.com' }, { email: 'briansmith8477@gmail.com' }, { email: 'oliviasmith8477@gmail.com' }, { email: 'ashsmith8477@gmail.com' }, { email: 'shellysmith8477@gmail.com' }, { email: 'ajay@madsciencekidz.com' }, { email: 'ajay2@ctopowered.com' }, { email: 'ajay@arena.tec.br' }, { email: 'ajay@smallbizdevgroup.com' }, { email: 'ajay@daustin.co' }];
              break; // Exit the loop once the data is found and updated
            }
          }

          // setCategoriesSendingMails((prevCategories) => [...prevCategories, category]);
          setCategoriesSendingMails((prevCategories) => {
            // Ensure prevCategories is initialized as an array
            prevCategories = prevCategories || [];

            // Filter the array
            return prevCategories.filter((prevCategory) => prevCategory !== category);
          });

          if (selectedOption === "google") {
            ipcRenderer.send("sendGoogleMailData", { data: initdata, category: category });
          } else if (selectedOption === "smtp") {
            ipcRenderer.send("sendMailData", { data: initdata, category: category });
          }


        } catch (error) {
          console.error("Error loading Electron IPC Renderer:", error);
        }
      }
    } else {
      console.warn("Electron not detected. IPC Renderer not available.");
    }
  };

  const sendInboxiousMail = () => {
    toggleSendingEmails(true);
    setShowTestPopup(true);
    setType('Inboxious')
    const selectedOption = localStorage.getItem("selectedOption");
    const selectedCategory = data.title;

    if (profileData && profileData.credit_limit !== null && profileData.credit_limit < 1) {
      return;
    }


    // Set the status of all emails to null before sending
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    const categoryData = storedData.find(item => item.title === selectedCategory);


    updateall();

    // Initialize success_count to 0 in localStorage
    const storedCategories = JSON.parse(localStorage.getItem("totalMailsSends")) || {};
    localStorage.setItem("totalMailsSends", JSON.stringify({
      ...storedCategories,
      [selectedCategory]: 0,
    }));

    if (ipcRenderer) {
      if (selectedOption === "google" || selectedOption === "smtp") {
        try {
          const initdata = JSON.parse(localStorage.getItem("data"));
          console.log("Electron detected. IPC Renderer available.");
          const category = data.title;

          for (let i = 0; i < initdata.length; i++) {
            if (initdata[i].title === category) {
              // Clear the composeddata field for the corresponding title
              initdata[i].data = [
                { email: '24166david@gmail.com' },
                { email: 'maxmm24166@gmail.com' },
                { email: 'carla.roson251@gmail.com' },
                { email: 'nadia.shanaa251@gmail.com' },
                { email: 'wesachify@gmail.com' },
                { email: 'multilogin22@gmail.com' },
                { email: 'samwe222@outlook.com' },
                { email: 'marvinjeanlouis787@hotmail.com' },
                { email: 'leonnoble16@outlook.com' },
                { email: 'jessicasowell2003@hotmail.com' },
                { email: 'warrenakin@att.net' },
                { email: 'patriciasgross@att.net' },
                { email: 'jasonadams1608@currently.com' },
                { email: 'thomasroberts@currently.com' },
              ];
              break; // Exit the loop once the data is found and updated
            }
          }

          // setCategoriesSendingMails((prevCategories) => [...prevCategories, category]);
          setCategoriesSendingMails((prevCategories) => {
            // Ensure prevCategories is initialized as an array
            prevCategories = prevCategories || [];

            // Filter the array
            return prevCategories.filter((prevCategory) => prevCategory !== category);
          });

          if (selectedOption === "google") {
            ipcRenderer.send("sendGoogleMailData", { data: initdata, category: category });
          } else if (selectedOption === "smtp") {
            ipcRenderer.send("sendMailData", { data: initdata, category: category });
          }


        } catch (error) {
          console.error("Error loading Electron IPC Renderer:", error);
        }
      }
    } else {
      console.warn("Electron not detected. IPC Renderer not available.");
    }
  };


  const handleMailSent = async (event, { email, category, success_count, total, status, senderDataIndex, composedDataIndex }) => {
    console.log(email, category, success_count, total, status);

    const updatedLiveStatus = liveMailStatus.map((mailStatus) => {
      if (mailStatus.category === category) {
        return { ...mailStatus, email, status, success_count, total };
      }
      return mailStatus;
    });

    if (status === 'success') {
      setLastSuccessfullEmail(email);
      setTotalMailsSends((prevCategories) => {
        prevCategories = prevCategories || [];
        const existingCategoryIndex = prevCategories.findIndex(cat => cat.category === category);

        if (existingCategoryIndex !== -1) {
          const storedData = JSON.parse(localStorage.getItem("data")) || [];

          // Find the category
          const categoryData = storedData.find((item) => item.title === category);

          if (categoryData) {
            // Find the specific data entry based on the email
            const emailData = categoryData.senderdata[senderDataIndex];
            const emailDatac = categoryData.composedata[composedDataIndex];
            console.log(emailData)
            if (emailData) {
              emailData.success = success_count;

              // Update the localStorage with the modified data
              localStorage.setItem("data", JSON.stringify(storedData));
            }
            if (emailDatac) {
              emailDatac.success = success_count;

              // Update the localStorage with the modified data
              localStorage.setItem("data", JSON.stringify(storedData));
            }
          }


          prevCategories[existingCategoryIndex].success_count = success_count;

          // Update localStorage with the new success_count
          const updatedCategory = prevCategories[existingCategoryIndex];
          const storedCategories = JSON.parse(localStorage.getItem("totalMailsSends")) || {};
          localStorage.setItem("totalMailsSends", JSON.stringify({
            ...storedCategories,
            [category]: updatedCategory.success_count,
          }));
          if (categorytype !== 'Gmass' && categorytype !== 'Inboxious') {
          }
          else {
            try {
              const BASE_API_URL = "https://brahmastra.site/";
              const loginToken = localStorage.getItem("loginToken");
              const storedDataString = localStorage.getItem("loginToken");
              const storedData = JSON.parse(storedDataString);
              if (storedData) {
                const access_token = storedData.access_token;
                console.log(access_token);
                if (access_token) {// Example API URL
                  const savedCountry = localStorage.getItem("selectedCountry");
                  // Fetch the API endpoint to post email data
                  const response = fetch(`${BASE_API_URL}save_data/`, {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify({ to_mail: email, country: savedCountry })
                  });

                  if (response.ok) {
                    updateall();
                    console.log('Email data posted successfully to API.');
                  } else {
                    console.error('Failed to post email data to API:');
                  }
                }
              }
            } catch (error) {
              console.error("Error while posting email data to API:", error);
            }
          }
          return [...prevCategories];
        } else {
          return [...prevCategories, { category, success_count }];
        }
      });
      updateall()
    }

    const storedData = JSON.parse(localStorage.getItem("data")) || [];

    // Find the category
    const categoryData = storedData.find((item) => item.title === category);

    if (categoryData) {
      // Find the specific data entry based on the email
      const emailData = categoryData.data.find((item) => item.email === email);

      if (emailData) {
        // Update the status and success_count for the email
        emailData.status = status;
        emailData.success_count = success_count;

        // Update the localStorage with the modified data
        localStorage.setItem("data", JSON.stringify(storedData));
      }
    }

    setLiveMailStatus(updatedLiveStatus);

    const mailsSentForCategory = updatedLiveStatus.filter(
      (mailStatus) => mailStatus.category === category
    );
    const allMailsSent = mailsSentForCategory.every(
      (mailStatus) => mailStatus.status === "success" || mailStatus.status === "failure"
    );

    if (allMailsSent) {
      setCategoriesSendingMails((prevCategories) => {
        prevCategories = prevCategories || [];
        prevCategories.filter((prevCategory) => prevCategory !== category)
      }
      );
    }
    updateall();
  };

  const handleAllMailsSent = (event, { category, successCount, failureCount }) => {
    console.log(`All mails sent for category: ${category}`);
    // if (categorytype !== 'Gmass' && categorytype !== 'Inboxius') {
    // Remove the category from the list
    setCategoriesSendingMails((prevCategories) => {
      prevCategories = prevCategories || [];
      prevCategories.filter((prevCategory) => prevCategory !== category);
      setShowTestPopup(false);
    }

    );
    // }

    updateall();
  };

  // if (categorytype !== 'Gmass' && categorytype !== 'Inboxius') {
  //   let isCategorySendingMails = categoriesSendingMails.includes(data.title);
  //   console.log(isCategorySendingMails);
  //   console.log(categoriesSendingMails);
  // }

  const storedCategories = JSON.parse(localStorage.getItem("totalMailsSends")) || {};
  const [publicIp, setPublicIp] = useState(null);

  const getSuccessCountForCategory = (category) => {
    return storedCategories[category] || 0;
  };

  const handleClose = () => {
    stopSending();
    setShowTestPopup(false);

  }

  return (
    <div>
      <div className="flex min-w-[1180px] bg-white pl-3 gap-8 p-3" style={{ height: "45px" }}>
        <div className="mainnavbtn">
          <NavButtons data="New contact" logo={contactLogo} popup={contactpop} />
        </div>
        <div className="mainnavbtn">
          <NavButtons data="Import Data" logo={fileLogo} popup={importdatapop} />
        </div>
        <div className="mainnavbtn">
          <NavButtons data="Compose new" logo={composeLogo} popup={composedatapop} />
        </div>
        <div className="mainnavbtn" onClick={sendMail}>
          <NavButtons data="Send" logo={playLogo} />
        </div>
        <div className="mainnavbtn" onClick={stopSending}>
          <NavButtons data="Stop" logo={playLogo} />
        </div>
        <div className="mainnavbtn" onClick={sendGmassMail}>
          <NavButtons data="G Mass" logo={playLogo} />
        </div>
        <div className="mainnavbtn" onClick={sendInboxiousMail}>
          <NavButtons data="InBoxious" logo={playLogo} />
        </div>
        <div className="mainnavbtn">
          <NavButtons data="App setting" logo={composeLogo} popup={appsettingpop} />
        </div>
      </div>

      {
        showTestPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="addcategory fixed w-screen h-screen backdrop-blur-[1px] top-0 z-10 flex justify-center items-center ">
              <div className="container w-[400px] bg-slate-200 h-[150px] rounded-md overflow-hidden">
                <div className="w-full bg-red-500 pt-2 h-10 flex justify-between px-4">
                  <p style={{ color: "white" }}>Test Mail sending ({categorytype})</p>
                  <p
                    className=" cursor-pointer"
                    onClick={handleClose}
                  >
                    X
                  </p>
                </div>
                <div className=" w-full flex justify-evenly mt-4">
                  {getSuccessCountForCategory(data.title)}/ {categorytype === 'Gmass' ? '19' : '14'}
                </div>
                <div className="flex w-full justify-evenly mt-4">
                  <p
                    className=" bg-red-500 px-3 rounded cursor-pointer py-1 " style={{ color: "white" }}
                    onClick={handleClose}
                  >
                    Stop{" "}
                  </p>

                </div>
              </div>
            </div>
          </div>)
      }
      <br />
    </div>
  );
};

export default Mainnav;
