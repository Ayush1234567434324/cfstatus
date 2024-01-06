"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './navbar/Navbar'
import { useState, useEffect } from 'react';
import Loading from './loading/loading';
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  const [usercookie, setusercookie] = useState('!');

  useEffect(() => {
    // Check if running on the client side before accessing the document
    if (typeof document !== 'undefined') {
      setusercookie(document.cookie);
    }
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
  
        
        {usercookie==='!'?<Loading/>:children}

        </body>
    </html>
  )
}
