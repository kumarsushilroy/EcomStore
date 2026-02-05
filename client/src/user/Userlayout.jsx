import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header';
import Footer from '../common/Footer';

const Userlayout = () => {
  return (
    <>
    <div className='row'>
      <div className="col-md-12">
        <div><Header/></div>
      </div>
      <div className="col-md-12">
        <div><Outlet/></div>
      </div>
      <div className="col-md-12 h-full">
        {/* <div><Footer/></div> */}
      </div>
      
      
      
      
      
    </div>
      </>
  )
}

export default Userlayout