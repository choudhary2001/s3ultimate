import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/files.png";
import Home from "./Home";

const Signin = () => {
  // localStorage.clear()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [showUserVerification, setShowUserVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [savedCountry, setSavedCountry] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const BASE_API_URL = "https://brahmastra.site/";
  const loginUrl = `${BASE_API_URL}accounts/login/`;
  const verifyUrl = `${BASE_API_URL}two_step`;
  const verifyRefreshTokenUrl = `${BASE_API_URL}verify-refresh-token/`;
  const countriesApiUrl = "https://restcountries.com/v2/all"; // Use a proper countries API


  let initdata = JSON.parse(localStorage.getItem("data"));

  if (initdata === null) {
    let ldata = [{ title: "Home", data: [], composedata: [], senderdata: [] }];
    localStorage.setItem("data", JSON.stringify(ldata));
  }

  async function getPublicIp() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error getting public IP:', error);
      return null;
    }
  }


  getPublicIp().then((ip) => {
    console.log('Public IP address:', ip);
  });

  useEffect(() => {
    fetch(countriesApiUrl)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);


  useEffect(() => {
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
    else {
      localStorage.clear();
    }
    // Access the refresh_token property
  }, []);

  const verifyRefreshToken = async (refreshToken) => {
    try {
      let userIp = null;
      getPublicIp().then((ip) => {
        // console.log('Public IP address:', ip);
        userIp = ip;
      });

      // const response = await fetch(verifyRefreshTokenUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     refresh_token: refreshToken,
      //     user_ip: userIp,
      //   }),
      // });

      // const data = await response.json();
      // // console.log(data)
      // if (response.status === 200) {
      // Verification successful, navigate to Home
      // alert("verified");
      setShowUserVerification(true);
      // } else {
      //   // Verification failed, remove loginToken from localStorage
      //   localStorage.removeItem("loginToken");
      //   localStorage.clear();
      // }
    } catch (error) {
      console.error("Error during refresh token verification:", error);
      localStorage.clear();
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "otp") {
      setOtp(value);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Username and password are required");
      return;
    }
    try {

      setLoading(true);
      // const response = await fetch(loginUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username: email,
      //     password: password,
      //   }),
      // });

      // const data = await response.json();

      // if (response.status === 200) {
      setShowOtpVerification(true);
      // } else {
      //   alert("Invalid credentials");
      // }
    } catch (error) {
      console.error("Error during login:", error);
    }
    finally {
      setLoading(false); // Set loading back to false after the login request completes
    }
  };

  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      // const response = await fetch(verifyUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username: email,
      //     otp: otp,
      //   }),
      // });

      // const data = await response.json();
      // // console.log(data);
      // if (response.status === 200) {
      // alert("OTP verification successful!");
      // localStorage.setItem("loginToken", JSON.stringify(data));
      setShowUserVerification(true);
      setSelectedOption(true);
      //   // You can perform additional actions after OTP verification success
      // } else {
      //   // alert("Invalid OTP");
      //   localStorage.removeItem("loginToken");
      // }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    } finally {
      setLoading(false); // Set loading back to false after the login request completes
    }
  };

  // const saveCountry = () => {
  //   localStorage.setItem("selectedCountry", selectedCountry);
  //   setSavedCountry(selectedCountry);
  // };

  // useEffect(() => {
  //   const savedCountry = localStorage.getItem("selectedCountry");
  //   if (savedCountry) {
  //     setSavedCountry(savedCountry);
  //   }
  //   // const selectedOption = localStorage.getItem("selectedOption");
  //   // if (selectedOption) {
  //   //   setSelectedOption(selectedOption);
  //   // }
  // }, []);


  const handleCardClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedOption", option);
    // console.log(localStorage.getItem("selectedOption"))
  };

  return (
    <>
      {!selectedOption ? (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {/* <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" style={{ height: "7.5rem" }} /> */}
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {!savedCountry ? (<>
                  {!showOtpVerification ? (
                    <span>Sign in to your account</span>
                  ) : (
                    <>
                      {showOtpVerification && (
                        <span>Verify Your Account</span>
                      )}
                    </>
                  )}
                </>
                ) :
                  (
                    <>
                      {!selectedOption ? (
                        <>
                          <span>Select Your method you want to send mail</span>

                        </>
                      )
                        :
                        (
                          <>

                          </>
                        )
                      }
                    </>

                  )
                }
              </h2>
            </div>
            {showUserVerification && savedCountry && (
              <>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="flex justify-between">
                    <div style={{
                      height: "250px", display: "flex",
                      /* align-content: center; */
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      border: "1px solid grey",
                      borderRadius: "4px",
                      cursor: "pointer"

                    }}
                      onClick={() => handleCardClick("google")}
                    >
                      <img style={{ transform: "scale(0.8)" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV2R_whc53L-Aygh8JgDx-dNd4B7plcEiS7w&usqp=CAU" />
                      <span style={{ textAlign: "center" }}>
                        Google API
                      </span>
                    </div>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <div style={{
                      height: "250px", display: "flex",
                      /* align-content: center; */
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      border: "1px solid grey",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                      onClick={() => handleCardClick("smtp")}
                    >

                      <img src="data:image/png;base64,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" />
                      <span style={{ textAlign: "center" }}>


                        SMTP
                      </span></div>
                  </div>
                </div>
              </>
            )}

            {!savedCountry && !showUserVerification ? (
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                  {!showOtpVerification ? (
                    <>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>

                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2">
                      <input
                        id="otp"
                        name="otp"
                        type="number"
                        autoComplete="current-otp"
                        required
                        value={otp}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={showOtpVerification ? handleOtpVerification : handleLogin}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={loading} // Disable the button when loading
                    >
                      {loading ? "Loading..." : showOtpVerification ? "Verify OTP" : "Sign in"}
                    </button>
                  </div>

                </form>


              </div>
            ) : (
              <>

              </>
            )}

          </div>
        </>
      ) : (
        <Home />

      )}

    </>
  );
};

export default Signin;
