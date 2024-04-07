import { useState } from "react";
import Inputfield from "./Inputfield";

const Basicinfo = ({ display, data, updateall }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [fax, setFax] = useState("");
  const [subscribedOn, setSubscribedOn] = useState("");
  const [birthday, setBirthday] = useState("");
  const [facebook, setFacebook] = useState("");
  const [yahoo, setYahoo] = useState("");
  const [skype, setSkype] = useState("");
  const [msn, setMsn] = useState("");
  const [note, setNote] = useState("");

  const basicInfo = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    address: address,
    city: city,
    company: company,
    website: website,
    fax: fax,
    subscribedOn: subscribedOn,
    birthday: birthday,
    facebook: facebook,
    yahoo: yahoo,
    skype: skype,
    msn: msn,
    note: note,
    status: null
  };

  const updatedata = JSON.parse(localStorage.getItem("data"));
  console.log(" from basic info al object");
  console.log(updatedata);
  // const update = updatedata.filter((item) => item.title === data.title);
  const savedata = () => {
    console.log("save data is run");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return;
    }

    // Check if the email already exists
    // Check if the email already exists in the same category
    const isDuplicateEmail = updatedata
      .filter((item) => item.title === data.title)
      .some((item) => item.data.some((info) => info.email === basicInfo.email));

    if (isDuplicateEmail) {
      console.log("Duplicate email found in the same category. Not saving data.");
      // You can add an alert or some feedback for the user here
      return;
    }

    // console.log(data.title);
    const update = updatedata.filter((item) => item.title === data.title);
    console.log("this is update data");
    // console.log(update);
    update[0].data.push(basicInfo);
    localStorage.setItem("data", JSON.stringify(updatedata));
    // console.log("this is from basic info after updateing data ");
    // console.log(JSON.parse(localStorage.getItem("data")));
    // console.log(updatedata);
    display();
    updateall();
  };
  // update[0].data.push(basicInfo);
  // console.log(update[0].data);
  // localStorage.setItem("data", JSON.stringify(updatedata));
  console.log(updatedata);

  return (
    <>
      <div className="flex">
        <div className="w-1/2  h-full pt-6">
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Email :
            </label>
            <input
              type="email"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              First Name :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Last Name :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Phone :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Address :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              City :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Company :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Website :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Fax :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/2  h-full pt-6">
          {/* <Inputfield label="Email" /> */}
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Subscribed on :
            </label>
            <input
              type="date"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={subscribedOn}
              onChange={(e) => setSubscribedOn(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Birthday :
            </label>
            <input
              type="date"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <Inputfield label="First Name" />
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Facebook :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Yahoo :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={yahoo}
              onChange={(e) => setYahoo(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Skype :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={skype}
              onChange={(e) => setSkype(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              MSN :
            </label>
            <input
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={msn}
              onChange={(e) => setMsn(e.target.value)}
            />
          </div>
          <div className="px-4 flex justify-end mb-4 mr-4">
            <label htmlFor="" className="mr-2">
              Note :
            </label>
            <textarea
              type="text"
              className="border-b-2 border-b-zinc-400 w-2/3 focus:outline-none focus:border-b-2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="h-[40px] flex w-full   justify-end bg-[rgb(0 0 204 / var(--tw-bg-opacity))]">
        <div className=" w-1/2 flex items-center justify-center gap-5 ">
          <div
            className="flex gap-2 w-32 justify-evenly bg-[#ffe330c1] p-1 px-2 rounded-md cursor-pointer"
            onClick={display}
          >
            {/* <img src={fileLogo} alt="" className="w-5 " /> */}
            <p>Cancel</p>
          </div>
          <div
            className="flex gap-2 w-32 justify-evenly bg-[#ffe330c1] p-1 px-2 rounded-md cursor-pointer"
            onClick={savedata}
          >
            {/* <img src={fileLogo} alt="" className="w-5 " /> */}
            <p>Ok</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basicinfo;
