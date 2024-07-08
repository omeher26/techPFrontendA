import React from "react";
import "./plimg.css";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PLimg = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem('tplToken');
      navigate('/login')
    }
  return (
    <div className="plM1">
      <div className="plM">
        <div className="plName" onClick={()=>navigate('/')}>
          <IoIosArrowBack />
          <div>Project Listing</div>
        </div>

        <div className="imgPpl">
          <img src="/assets/Logo (1).png" alt="" />
        </div>

        <div className="logoutpl" onClick={()=> handleLogout()}>
          <FiLogOut />
        </div>
      </div>
    </div>
  );
};

export default PLimg;


