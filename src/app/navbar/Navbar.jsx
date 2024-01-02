"use client";
import Link from "next/link";
import Image from "next/image";
import codeforcesicon from "../../../public/codeforces_logo.svg";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';


export default function Navbar() {













  const [isFull, setisFull] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const [username, setusername] = useState('');

  useEffect(() => {
    // Check if running on the client side before accessing the document
    if (typeof document !== 'undefined') {
      setusername(document.cookie);
    }
  }, []);
 
  const mobnav = () => {
    const checkbox = document.getElementById("checkbox2");
  
    if (checkbox instanceof HTMLInputElement) {
      const isChecked = checkbox.checked;
      setMobileNavOpen(isChecked);
    } else {
      console.error("Checkbox element not found");
    }
  };
  
  const [userData, setUserData] = useState([]);
  


  useEffect(() => {
    const fetchUserData = async () => {
      if (username !== '') {
        try {
          const apiUrl = `https://codeforces.com/api/user.info?handles=${username}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
         
          if (response.ok) {
            setUserData(data.result[0]); // Assuming the data structure has a result array
          
           
          } else {
            setUserData([]);
        
          }
        } catch (error) {
          setUserData([]);
        
        }
      } 
    };

    fetchUserData();
  }, [username]);
 



  
  const timestamp =username===''?0: userData.registrationTimeSeconds;

  // Create a new Date object using the timestamp (multiply by 1000 to convert seconds to milliseconds)
  const registrationDate = new Date(timestamp * 1000);
  
  // Define months as an array for better readability
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Get various components of the date
  const year = registrationDate.getFullYear();
  const monthName = months[registrationDate.getMonth()];
  const day = registrationDate.getDate();

  

  useEffect(() => {
    const handleResize = () => {
      setisFull(window.innerWidth);
    };

    // Check if window is defined before adding event listener
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      // Check if window is defined before removing event listener
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const logout = () => {
    if (typeof document !== 'undefined') {
      document.cookie = `${username}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      window.location.reload();
    }
  };
  

  









  return (
    <>
      <div className={`ml-${isFull < 400 ?8:10} sm-ml-2 my-4 pr-5`}>

        <div className="flex" >
          <Image
            priority
            src={codeforcesicon}
            alt="Codeforces Logo"
            height={isFull < 768 ? isFull<400?650: 800 : 1000}
            width={isFull < 768 ?isFull<400?150: 200 : 300}
            style={{'zIndex':'2'}}
          />
          <b className="text-red-500" style={{'zIndex':'2'}}>Status</b>
         {(isFull<768  || username==='')?(null):( <div className="flex items-center justify-end w-full gap-4">
          <img className="w-14 h-14 rounded-full" src={userData.avatar} alt=""/>
        <div className="font-medium dark:text-black">
        <div className="flex justify-end gap-2"> 
        <div>{username}</div>
        <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  onClick={logout}
>
  <path
    d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
    fill="currentColor"
  />
  <path
    d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
    fill="currentColor"
  />
</svg>
  </div> 
        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {day} {monthName} {year}</div>
        </div>
        </div>)}
        </div>
      </div>
         


      {isFull >= 768 ? (
        
        <div className="flex w-100 pr-5">
          <nav className="ml-10 my-4 border border-solid border-gray-300 rounded p-2" style={{ width: "100%" }}>
            <ul className="flex space-x-4 ">
            <li className={`navlist ${pathname === '/' ? 'active' : ''}`}>
              <Link href="/">HOME</Link>
              </li>
              <li className={`navlist ${pathname === '/about' ? 'active' : ''}`}>
                <Link href="/about">ABOUT</Link>
              </li>
            
              <li className="flex items-center justify-end w-full ">
                <input className="border border-solid border-black rounded" type="text" placeholder="Search.." />
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="fixed right-5 pr-3" style={{'top':'-30px'}} >
          <input type="checkbox" id="checkbox2" className="checkbox2 visuallyHidden " onClick={mobnav} />
          <label htmlFor="checkbox2">
            <div className="hamburger hamburger2">
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
              <span className="bar bar4"></span>
            </div>
          </label>

        </div>
      )}
      {
        isFull<768 &&
        <div className={`sidebar ${isMobileNavOpen ? 'open' : 'closed'}`}>
          {isMobileNavOpen &&
          <div className=" my-14 gap-5 flex flex-col">

          <Link href="/" className={`sidebar-link navlist ${pathname === '/' ? 'active' : ''}`}>
          HOME
        </Link>
        <Link href="/about" className={`sidebar-link navlist ${pathname === '/about' ? 'active' : ''}`}>
          ABOUT
        </Link>
        <li className="flex absolute bottom-24  pr-3 w-full sidnavuserinfo">
        {( username==='')?(null):( <div className="flex items-center justify-center w-full gap-4">
          <img className=" w-16 h-16 rounded-full" src={userData.avatar} alt="" />
        <div className="font-medium dark:text-black">
        <div className="flex justify-end gap-2"> 
        <div>{username}</div>
        <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  onClick={logout}
>
  <path
    d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
    fill="currentColor"
  />
  <path
    d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
    fill="currentColor"
  />
</svg>
  </div> 
        <div className="text-sm text-gray-500 dark:text-gray-400" style={{'fontSize':'12px'}}>Joined in {day} {monthName}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400" style={{'fontSize':'12px'}}> {year}</div>
        </div>
        </div>)}
        </li>
        <li className="flex absolute bottom-14  justify-center pr-3 w-full">
                <input className="border border-solid border-black rounded" type="text" placeholder="Search.." />
              </li>


          </div>
}
  
        <style jsx>{`













       .sidebar {
        width: 0%;
        max-width: 75%;
        background-color: white;
        padding: 10px;
        color: black;
        position: fixed;
        top: 0;
        bottom: 0;
        box-shadow: 1px 5px 4px #1e1d1dde;
        animation-duration: 0.5s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
        z-index:1;
      }
      
      @keyframes expandSidebarOpen {
        from {
          width: 0%;
        }
      
        to {
          width: 75%;
        }
      }
      
      @keyframes expandSidebarClose {
        from {
          width: 75%;
          padding: 0px;
        }
      
        to {
          width: 0%;
          padding:0px;
        }
      }
      
      .sidebar.open {
        animation-name: expandSidebarOpen;
      }
      
      .sidebar.closed {
        animation-name: expandSidebarClose;
      
      }
      
        .sidebar-link {
          text-decoration: none;
          color: #fff;
          padding: 8px 16px;
          margin: 4px 0;
          transition: background-color 0.3s;
        }

        .sidebar-link:hover {
          background-color: #555;
        }

        .active {
          background-color: #555;
        }
      `}</style>
      </div>
      }
    
    </>
  );
}
