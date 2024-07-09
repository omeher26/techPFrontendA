import React, {  useState } from "react";
import "./pllist.css";
import { MdOutlineSearch } from "react-icons/md";
import { Button, Pagination, Stack, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allProjects, sortByEndD, sortByLstMod, sortByPrio, sortByStartD, sortByStatus, updProStatus } from "../../../../../redux/slice/ProjectSlice";

const PLList = () => {
  const [searchD,setSearchD] = useState('');
  const [currP, setCurrP] = useState(1);
  const postPpage = 4;


  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(allProjects());
  // },[dispatch]);

  const {data,isLoading, isError} = useSelector((val)=>val.proData);
  if(isLoading){
    return <h2 style={{textAlign:'center'}}>Loading</h2>
  }
  if(isError){
    return <h2 style={{textAlign:'center'}}>Error</h2>
  }


  // search
  const handleSearch = (e)=>{
    setSearchD(e.target.value);
  }
  const filterD = data.filter((val)=> 
    searchD ?
    val.pname.toLowerCase().includes(searchD.toLowerCase())
    : true
  );


  //date cutmiz
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // pagination logic
  const lastIdx = postPpage * currP;
  const firstIdx = lastIdx - postPpage;

  const allData = filterD.slice(firstIdx, lastIdx);
  // const allData = data.slice(firstIdx, lastIdx);

  const buttonNum = [];
  var lastPage = Math.ceil(data.length / postPpage)
  for(var i=1; i<=lastPage; i++){
    buttonNum.push(i)
  }

  //sort functionality
  const handleSort = (e)=>{
    var val = e.target.value;

    if(val === 'all'){
      dispatch(allProjects());
    }else if(val === 'startDate'){
      dispatch(sortByStartD());
    }else if(val === 'endDate'){
      dispatch(sortByEndD());
    }else if(val === 'lastModified'){
      dispatch(sortByLstMod());
    }else if(val === 'priority'){
      dispatch(sortByPrio());
    }else if(val === 'status'){
      dispatch(sortByStatus());
    }
  }


  //update status
  const handleStatusUpd = (id,status)=>{
    dispatch(updProStatus({id,status}));
  }


  return (
    <div className="pllistMain1">
      <div className="pllistMain2">
        <div className="pllistSerSor">
          <div className="pllistSer">
            {
              searchD.length>0 ?
              '' :
              <MdOutlineSearch
                className="search-icon"
                style={{ color: "#999" }}
              />
            }
            <input type="Search" placeholder="Search" 
              value={searchD}
              onChange={handleSearch}
            />
          </div>
          <div className="pllistSort">
            <label>Sort by :</label>
            <select name="Sort" id="" onChange={handleSort}>
              <option value="all">All</option>
              <option value="priority">Priority</option>
              <option value="lastModified">Recently Modified</option>
              <option value="status" >Status</option>
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
            </select>
          </div>
        </div>
        <div>
          <Table responsive className="pllistTableM">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Reason</th>
                <th>Type</th>
                <th>Division</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Dept.</th>
                <th>Location</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              allData
              .map((val,idx)=>{
                return(
              <tr className="my-auto p-0" key={idx}>
                <td>
                  <p style={{ fontWeight: "bold" }}>{val.pname} </p>
                  <p style={{marginBlock:'-4px'}}>{formatDate(val.sDate)}  to</p>
                  <p>{formatDate(val.eDate)}</p>
                </td>
                <td>{val.reason} </td>
                <td>{val.typeB} </td>
                <td>{val.division} </td>
                <td>{val.category} </td>
                <td>{val.priority} </td>
                <td>{val.department} </td>
                <td>{val.location} </td>
                <td>{val.status} </td>
                <td className="col-2 pllistbtncl" gap={2}>
                  <Stack direction="horizontal" gap={2}>
                    <Button onClick={()=>handleStatusUpd(val._id, 'Start')}>Start</Button>
                    <Button onClick={()=>handleStatusUpd(val._id, 'Close')} variant="outline-primary">Close</Button>
                    <Button onClick={()=>handleStatusUpd(val._id, 'Cancelled')} variant="outline-primary">Cancle</Button>
                    {/* status having 4 points 1-Register while user register */}
                    {/* 2- start ,3-close, 4-cancled  (for backend )*/}
                  </Stack>
                </td>
              </tr>

                )
              })
            }
            </tbody>
          </Table>
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'center',marginTop:'2vh'}}>
        <Pagination>
          <Pagination.First onClick={()=>setCurrP(1)}/>
          <Pagination.Prev onClick={()=>currP>1 ? setCurrP(currP-1): 0}/>
          {
            buttonNum.map((val,idx)=>{
              return(
                <Pagination.Item key={idx} onClick={()=>setCurrP(val)} active={val === currP}>{val}</Pagination.Item>
              )
            })
          }

          {/* <Pagination.Ellipsis /> */}
          {/* <Pagination.Item onClick={()=>setCurrP(lastPage)} active={lastPage === currP}>{lastPage}</Pagination.Item> */}
          <Pagination.Next onClick={()=>setCurrP(currP+1)}/>
          <Pagination.Last onClick={()=>setCurrP(lastPage)}/>
        </Pagination>
      </div>
    </div>
  );
};

export default PLList;


























