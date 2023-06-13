import React, { useState } from 'react'
// import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import Footer from '../../components/footer'
// import { useLocation } from 'react-router-dom';

export default function Home(){
  // const log = useLocation();
  // const [user,setUser] = useState(localStorage.getItem("log_email"))


  return (
    <>
        {/* {console.log(route.params)} */}
        {/* <Header/> */}
        <Banner/>
        <Footer/>
    </>
  )
}
