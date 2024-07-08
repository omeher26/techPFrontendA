import React, { useEffect } from "react";
import Dashboard from "../Dashboard/Dashboard";
import CardUI from "../Dashboard/cards/CardUI";
// import CardsMain from "../Dashboard/cards/mobile/CardsMain";
import './mainHome.css';
import ChartMain from "../Dashboard/chart/ChartMain";
import { useNavigate } from "react-router-dom";

const MainHome = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('tplToken')

  // const width = window.innerWidth;
  // console.log(width);

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[token,navigate]);

  return (
    <div className="mainHomeM">
      <div className="mainHDash">
        <Dashboard />
      </div>

      <div className="mainHCard">
        {/* {width > 700 ? <CardUI /> : <CardsMain />} */}
        <CardUI/>
      </div>

      <div className="chartName">Department wise Total Vs Closed</div>

      <div className="mainHChart">
        <ChartMain/>
      </div>

    </div>
  );
};

export default MainHome;



