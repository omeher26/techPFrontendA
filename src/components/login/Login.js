import React, { useState } from "react";
import "./login.css";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const apiLink = process.env.REACT_APP_TPL;

  const navigate = useNavigate();
  const [opn,setOpn] = useState(false);
  const [err,setErr] = useState(false);
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateMail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email)
  }

  const format = {
    email:email,password:password
  }
 
  const [invCre, setInvCre] = useState('');


  const handleLogin = async(e) => {
    e.preventDefault();
    setErr(true);
    if(email.length>0 && password.length>0 && validateMail(email)){

      try{
        const res = await axios.post(`${apiLink}/login`, format);
        localStorage.setItem('tplToken', res.data.token);
        navigate('/');
      }catch(err){
        console.log(err);
        setInvCre(err.response.data.message);
      }

    }
  }
    




  

  return (
    <div className="loginm1">
      <div className="loginM">
        <img src="/assets/Logo (1).png" alt="" />
        <p>Online Project Management</p>
      </div>

      <div className="loginForm">
        <p style={{ color: "black" }} className="fs-4">Login to get Started</p>
        <div className="loginF2">
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {err && email.length === 0 && (<p style={{ color: "red" }}>Email is Required</p>)}
            {err && (!validateMail(email)) && email.length>0 && (<p style={{ color: "red" }}>Email is wrong</p>)}
          </FormGroup>

          <FormGroup>
            <FormLabel>Password</FormLabel>

            <InputGroup>
              <FormControl 
                type={opn ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Text
                onClick={() => setOpn(!opn)}
                style={{ cursor: "pointer" }}
              >
                {opn ? <FaRegEye /> : <FaRegEyeSlash /> }
              </InputGroup.Text>
            </InputGroup>
            { err && password.length === 0 && (
              <p style={{ color: "red" }}>Password is required</p>
            )}

            <p style={{color:'blue',textAlign:'right'}}>Forgot Password?</p>
          </FormGroup>
          <Button onClick={handleLogin} style={{paddingInline:'28px',borderRadius:'16px'}} >Login</Button>

          <p style={{marginInline:'8px',color:'red'}}>{invCre} </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



