import React, { useEffect, useState } from "react";
import "./plmcards.css";
import { MdOutlineSearch } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { Button, Offcanvas, Stack } from "react-bootstrap";
// import MSort from "./MSort";
import { useDispatch, useSelector } from "react-redux";
import {  allProjects, sortByLstMod, sortByPrio, sortByStartD, sortByStatus, updProStatus } from "../../../../../redux/slice/ProjectSlice";

const PLMCards = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [searchM, setSearchM] = useState('');
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(allProjects())
  },[dispatch]);

  const {data,isLoading, isError} = useSelector((val)=> val.proData);
  if(isLoading){
    return <h2>Loading</h2>
  }
  if(isError){
    return <h2>Error</h2>
  }

  // search
  const handleSearch = (e)=>{
    setSearchM(e.target.value);
  }
  const filterM = data.filter((val)=>
    searchM ?
    val.pname.toLowerCase().includes(searchM.toLowerCase())
    : true
  )

  //date cutmiz
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  //update status
  const handleStatusUpd = (id,status)=>{
    dispatch(updProStatus({id,status}));
  }

  return (
    <>
      <div className="PLMCardsMain1">
        <div className="PLMCardsMain2">

          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="bottom"
            // scroll={true}
            className="ofCanPLM"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="fs-4">
                Sort Projects By
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div>
                <Stack direction="vertical" gap={4}>
                  {/* <div onClick={()=>dispatch(allDataProject())}>All</div> */}
                  <div onClick={()=>dispatch(allProjects())}>All</div>
                  <div onClick={()=>dispatch(sortByPrio())}>Priority</div>
                  <div onClick={()=>dispatch(sortByLstMod())}>Recently Modified</div>
                  <div onClick={()=>dispatch(sortByStatus())}>Status</div>
                  <div onClick={()=>dispatch(sortByStartD())}>Start Date</div>
                  <div onClick={()=>dispatch(sortByLstMod())}>End Date</div>
                </Stack>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          <div className="PLMCardsSerSor">

            <div className="PLMCardsSer">
              {
                searchM.length>0 ?
                '' :
              <MdOutlineSearch
                className="search-icon"
                style={{ color: "#999" }}
              />

              }
              <input type="Search" placeholder="Search" 
                value={searchM}
                onChange={(e)=>handleSearch(e)}
              />
            </div>

            <div className="PLMCardsSort" onClick={() => setShow(true)}>
              <BiMenuAltLeft style={{ color: "#999" }} />
            </div>
          </div>


           {
            filterM.map((val,idx)=>{
              return(

              <div className="PLMCardStyM11" key={idx}>
            <div className="PLMCardsStylMain">
              <div className="PLMCdfM1">
                <h4>{val.pname} </h4>
                <h5>{val.status} </h5>
              </div>
              <div>
                <p>{formatDate(val.sDate)} to {formatDate(val.eDate)} </p>
              </div>
              <div className="PLMCdf">
                <h6>Reason :</h6>
                <div>{val.reason} </div>
              </div>
              <div className="PLMCdfUlm">
                <h6>Type :</h6>
                <div>{val.typeB} </div>
                <ul className="PLMCdfUl1">
                  <li className="PLMCdfUl2">
                    <h6>Category : </h6>
                  </li>
                  <div>{val.category} </div>
                </ul>
              </div>
              <div className="PLMCdfUlm">
                <h6>Div :</h6>
                <div>{val.division} </div>
                <ul className="PLMCdfUl1">
                  <li className="PLMCdfUl2">
                    <h6>Dept : </h6>
                  </li>
                  <div>{val.department} </div>
                </ul>
              </div>
              <div className="PLMCdf">
                <h6>Location :</h6>
                <div>{val.location} </div>
              </div>
              <div className="PLMCdf">
                <h6>Priority :</h6>
                <div>{val.priority} </div>
              </div>
              <div className="PLMCdfBtn1">
                <Button onClick={()=>handleStatusUpd(val._id, 'Start')} className="PLMCbtnM">Start</Button>
                <Button onClick={()=>handleStatusUpd(val._id, 'Close')} className="PLMCbtnM" variant="outline-primary">
                  Close
                </Button>
                <Button onClick={()=>handleStatusUpd(val._id, 'Cancelled')} className="PLMCbtnM" variant="outline-primary">
                  Cancel
                </Button>
              </div>
            </div>
              </div>
              )
            })
           }

          {/* <div className="PLMCardStyM11">
            <div className="PLMCardsStylMain">
              <div className="PLMCdfM1">
                <h4>Line Filter</h4>
                <h5>Running</h5>
              </div>
              <div>
                <p>May-26-2001 to today</p>
              </div>
              <div className="PLMCdf">
                <h6>Reason :</h6>
                <div>Business</div>
              </div>
              <div className="PLMCdfUlm">
                <h6>Type :</h6>
                <div>Internal</div>
                <ul className="PLMCdfUl1">
                  <li className="PLMCdfUl2">
                    <h6>Category : </h6>
                  </li>
                  <div> Quantity A</div>
                </ul>
              </div>
              <div className="PLMCdfUlm">
                <h6>Div :</h6>
                <div>Compressor</div>
                <ul className="PLMCdfUl1">
                  <li className="PLMCdfUl2">
                    <h6>Dept : </h6>
                  </li>
                  <div> Strategy</div>
                </ul>
              </div>
              <div className="PLMCdf">
                <h6>Location :</h6>
                <div>Pune</div>
              </div>
              <div className="PLMCdf">
                <h6>Priority :</h6>
                <div>High</div>
              </div>
              <div className="PLMCdfBtn1">
                <Button className="PLMCbtnM">Start</Button>
                <Button className="PLMCbtnM" variant="outline-primary">
                  Close
                </Button>
                <Button className="PLMCbtnM" variant="outline-primary">
                  Cancel
                </Button>
              </div>
            </div>
          </div> */}

    
        </div>
      </div>
    </>
  );
};

export default PLMCards;
