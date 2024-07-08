import React from "react";
import "./cphimg.css";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CPHimg = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem('tplToken');
      navigate('/login')
    }
  return (
    <div className="CPH1">
      <div className="CPM">
        <div className="CPName" onClick={()=>navigate('/')}>
          <IoIosArrowBack />
          <div>Create Projects</div>
        </div>

        <div className="imgCPH">
          <img src="/assets/Logo (1).png" alt="" />
        </div>

        <div className="logoutCP" onClick={()=>handleLogout()}>
          <FiLogOut />
        </div>
      </div>
    </div>
  );
};

export default CPHimg;


