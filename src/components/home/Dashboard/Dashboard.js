import React from "react";
import "./dashboard.css";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem('tplToken');
      navigate('/login')
    }
  return (
    <div className="dashM1">
      <div className="dashM">
        <div>
          <h2>Dashboard</h2>
        </div>

        <div className="imgPDash">
          <img src="/assets/Logo (1).png" alt="" />
        </div>

        <div className="logoutD" onClick={()=>handleLogout()}>
          <FiLogOut />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


