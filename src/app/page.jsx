"use client"
import { useState } from "react";
import Button6 from "./button/button";

export default function Home() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [usercookie , setusercookie] = useState(document.cookie);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUsernameFetch = async () => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
      const data = await response.json();

      // Assuming the API response structure includes a 'result' key with user information
      const userInformation = data.result[0];

      // Set the fetched user data in state
      setUserData(userInformation);

      // Store the username in a cookie
      document.cookie = `${username}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
      setusercookie(document.cookie);
      window.location.reload();
       
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };



  return (
  
    usercookie===''?(
    <div className="w-full flex flex-col items-center gap-2 justify-center my-20">
      <div className="w-72">
        <div className="relative w-full min-w-[200px] h-10 border-black">
          <input
            className="peer w-full h-full bg-transparent text-gray-500 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown: border-t placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder=" "
            value={username}
            onChange={handleInputChange}
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Username
          </label>
        </div>
      </div>
      <div onClick={handleUsernameFetch}>
        <Button6 text={'START'} />
      </div>
    </div>):(<></>)
    
  );
 
}
