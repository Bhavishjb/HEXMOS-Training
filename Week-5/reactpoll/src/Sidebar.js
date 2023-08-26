 import React from 'react';
import { useNavigate } from 'react-router-dom/dist';
import FilterComp from './FilterComp';
import './Home.css';
import { LBtn } from './Buttons';
 function Sidebar() {
  const navigate = useNavigate();
   return (
    <>
        <LBtn onClick={()=>navigate("/createpoll")} label="Create Poll"/>
        <FilterComp/>
    </>
   )
}

export default Sidebar