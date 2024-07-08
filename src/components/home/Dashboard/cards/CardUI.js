// import React from 'react';
// import './cardUi.css';

// const CardUI = () => {
//   return (
//     <div className='card-main'>
//         <div className='clr-lin'></div>
//         <div className='card-inter'>
//             <div className='card-name'>Onkar</div>
//             <h1 className='card-val'>26</h1>
//         </div>
//     </div>
//   )
// }

// export default CardUI




import React, { useEffect } from "react";
import "./cardUi.css";
import { useDispatch, useSelector } from "react-redux";
import { allProjects } from "../../../../redux/slice/ProjectSlice";
import CountUp from "react-countup";
// import data from "./tpD";


const CardUI = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(allProjects())
  },[dispatch]);

  const {data} = useSelector((val)=>val.proData);

  const closed = data?.filter((val)=> val.status === 'Close').length;
  const start = data?.filter((val)=> val.status === 'Start').length;
  const register = data?.filter((val)=> val.status === 'Register').length;
  const cancel = data?.filter((val)=> val.status === 'Cancelled').length;
  const dataCard =[
    {name:'Total Project', val:data?.length},
    {name:'Closed', val:closed},
    {name:'Running', val:start},
    {name:'Closure Delay', val:register},
    {name:'Cancelled', val:cancel},
  ]
  return (
    <div className="card-container">
      {dataCard.map((val, idx) => {
        return (
          <div className="card-main" key={idx}>
            <div className="clr-lin"></div>
            <div className="card-inter">
              <div className="card-name">{val.name} </div>
              <h1 className="card-val">
                <CountUp  start={0} end={val.val} duration={2.5}/>
                {/* {val.val}  */}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardUI;
