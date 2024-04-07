import React, { useEffect, useState } from "react";

const Bottombar = ({ data, updateall, profileData }) => {
  const [liveMailStatus, setLiveMailStatus] = useState([]);
  const [categoriesSendingMails, setCategoriesSendingMails] = useState([]);

  const storedCategories = JSON.parse(localStorage.getItem("totalMailsSends")) || {};
  const [publicIp, setPublicIp] = useState(null);

  const getSuccessCountForCategory = (category) => {
    return storedCategories[category] || 0;
  };

  async function getPublicIp() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const ipdata = await response.json();
      setPublicIp(ipdata.ip);
      return ipdata.ip;
    } catch (error) {
      console.error('Error getting public IP:', error);
      return null;
    }
  }

  // Example usage
  getPublicIp().then((ip) => {
    console.log('Public IP address:', ip);
  });


  return (
    <div className="h-full w-full bg-black">
      <div className="flex justify-center h-full items-center overflow-hidden gap-2 text-sm">
        <p className="max-w-[400px] px-2  border-l-2">
          {publicIp}
        </p>
        <p className="max-w-[400px] px-2  border-l-2">
          {profileData.start_date} - {profileData.end_date}
        </p>
        <p className="max-w-[400px] color-black px-2 border-r-2 border-l-2">
          Mailer
        </p>
        <p className="border-r-2 px-2">Progress: ({getSuccessCountForCategory(data.title)}/{data.data ? data.data.length : 0})</p>
        <p typeof="progressbar"></p>
      </div>
    </div>
  );
};

export default Bottombar;
