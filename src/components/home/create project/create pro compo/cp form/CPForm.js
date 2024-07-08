import React, { useState } from 'react'
import { Button, Col, Form, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap'
import './cpform.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPro } from '../../../../../redux/slice/ProjectSlice'

const CPForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [err,setErr] = useState(false);
    const format = {
        pname:'',reason:'',typeB:'',division:'',category:'',priority:'',department:'',sDate:'',eDate:'', location:''
    }
    const [pData,setPData] = useState(format);

    const handleInput = (e)=>{
        const {name,value} = e.target;
        setPData({...pData, [name]:value})
    }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = new Date(pData.sDate);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(pData.eDate);
        endDate.setHours(0, 0, 0, 0);

        console.log("pData:", pData);
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);
        console.log("today:", today);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErr(true);
        if(
            (pData.pname.length>0) && 
            (pData.reason.length>0) &&
            (pData.typeB.length>0)  &&
            (pData.division.length>0) &&
            (pData.category.length>0) &&
            (pData.priority.length>0) &&
            (pData.department.length>0) &&
            (pData.sDate.length > 0) &&
            (pData.eDate.length > 0) &&
            // (pData.sDate <= pData.eDate) &&
            // (new Date(pData.sDate) >= new Date())
            startDate <= endDate &&
            startDate >= today
        ){
                console.log(pData);
                dispatch(createPro(pData));
                navigate('/projectList')
        }
    }



  return (
    <div className='CPFormM1'>
        <div className='CPFormM2'> 
            <Form style={{padding:'15px'}}>
                <Row className='d-flex justify-content-between'>
                    <Col md={6} sm={12}>
                        <FormControl
                            placeholder='Enter Project Theme'
                            as='textarea'
                            name='pname'
                            onChange={(e)=>handleInput(e)}
                            rows={2}
                            required
                        />
                       {err && (pData.pname).length <1 && <p style={{color:'red'}}>Enter Project Name is Required</p> }
                    </Col>
                    <Col md={6} className='CPFormBtn1'>
                        <Button onClick={(e)=>handleSubmit(e)} className='CPFormBtn1M'>Save Project</Button>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col md={3} sm={12} >
                        <FormLabel>Reason</FormLabel>
                        <FormSelect name='reason' onChange={(e)=>handleInput(e)}>
                            <option value="">--Select Option--</option>
                            <option value="Business">For Business</option>
                            <option value="Personal">For Personal</option>
                            <option value="Delership">For Delership</option>
                        </FormSelect>
                        {err && (pData.reason).length<1 && <p style={{color:'red'}}>Select Reason is Required</p> }
                    </Col>
                    
                    <Col md={3} sm={12} >
                        <FormLabel>Type</FormLabel>
                        <FormSelect name='typeB' onChange={(e)=>handleInput(e)}>
                            <option value="">--Select Option--</option>
                            <option value="Internal">Internal</option>
                            <option value="External">External</option>
                            <option value="Vendor">Vendor</option>
                        </FormSelect>
                        {err && (pData.typeB).length<1 && <p style={{color:'red'}}>Select Type is Required</p> }
                    </Col>
                    <Col md={3} sm={12} >
                        <FormLabel>Division</FormLabel>
                        <FormSelect name='division' onChange={(e)=>handleInput(e)}>
                            <option value="">--Select Option--</option>
                            <option value="Compressor">Compressor</option>
                            <option value="Filter">Filter</option>
                            <option value="Pump">Pump</option>
                        </FormSelect>
                        {err && (pData.division).length<1 && <p style={{color:'red'}}>Select Division is Required</p> }
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={3} sm={12} >
                        <FormLabel>Category</FormLabel>
                        <FormSelect name='category' onChange={(e)=>handleInput(e)}>
                            <option value="">--Select Option--</option>
                            <option value="Quantity A">Quantity A</option>
                            <option value="Quantity B">Quantity B</option>
                            <option value="Quantity C">Quantity C</option>
                        </FormSelect>
                        {err && (pData.category).length<1 && <p style={{color:'red'}}>Select Category is Required</p> }
                    </Col>
                    <Col md={3} sm={12} >
                        <FormLabel>Priority</FormLabel>
                        <FormSelect name='priority' onChange={(e)=>handleInput(e)}>
                            <option value="">--Select Option--</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </FormSelect>
                        {err && (pData.priority).length<1 && <p style={{color:'red'}}>Select Priority is Required</p> }
                    </Col>
                    <Col md={3} sm={12} >
                        <FormLabel>Department</FormLabel>
                        <FormSelect name='department' onChange={(e)=>handleInput(e)}>
                            <option value="">--Select Option--</option>
                            <option value="Hr">Hr</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Finance">Finance</option>
                            <option value="Quality">Quality</option>
                            <option value="Storage">Storage</option>
                        </FormSelect>
                        {err && (pData.department).length<1 && <p style={{color:'red'}}>Select Department is Required</p> }
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={3} sm={12} >
                        <FormLabel>Start Date as per Project Plean</FormLabel>
                        <FormControl
                            type='date'
                            name='sDate'
                            onChange={(e)=>handleInput(e)}
                        />
                        {err && (pData.sDate).length<1 && <p style={{color:'red'}}>Select Starting Date is Required</p> }
                        {err && (new Date(pData.sDate).setHours(0, 0, 0, 0) <  new Date().setHours(0,0,0,0)) && <p style={{color:'red'}}>Start Date is today or greater then today</p> }
                    </Col>
                    <Col md={3} sm={12} >
                        <FormLabel>End Date as per Project Plean</FormLabel>
                        <FormControl
                            type='date'
                            name='eDate'
                            onChange={(e)=>handleInput(e)}
                        />
                        {err && (pData.eDate).length<1 && <p style={{color:'red'}}>Select End Date is Required</p> }
                        {err && (pData.sDate > pData.eDate) && <p style={{color:'red'}}>End Date greater than Start Date</p> }
                    </Col>
                    <Col md={3} sm={12} >
                        <FormLabel>Location</FormLabel>
                        <FormSelect name='location' onChange={(e)=>handleInput(e)}>
                            <option value="">--Select Option--</option>
                            <option value="Pune">Pune</option>
                            <option value="Narayangaon">Narayangaon</option>
                            <option value="Mumbai">Mumbai</option>
                        </FormSelect>
                        {err && (pData.location).length<1 && <p style={{color:'red'}}>Select Location is Required</p> }
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col md={6} sm={0} ></Col>
                    <Col md={6} sm={12} className='CPFormRegStatus'>
                        <FormLabel>Status : </FormLabel>  
                           {/* status having 4 points 1-Register while user register */}
                           {/* 2- start ,3-close, 4-cancled  (for backend )*/}
                        <h6> Register</h6>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col md={0} sm={12} className='CPFormBtn1Last'>
                        <Button onClick={(e)=>handleSubmit(e)} className='CPFormBtn1M'>Save Project</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
  )
}




export default CPForm;



