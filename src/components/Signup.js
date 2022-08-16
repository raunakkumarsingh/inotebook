import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Signup(props) {
    const[credentials,setCredentials]=useState({name:"",email:"",password:""});
    let history=useNavigate();

    const {showAlert}=props;
    
    // showAlert("Invalid Credentials","danger");

 const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
}

 const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("https://inotebook554.herokuapp.com/api/auth/createuser", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) 
    });
    const json= await response.json();
    console.log(json);
    if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        history("/login");
        showAlert("Account Creadted Successfully","success");
    }
    else{
        showAlert("Invalid Credentials","danger");
    }
}
  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' onChange={onChange} required id="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' id="email" onChange={onChange} required aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password'onChange={onChange} minLength={5}  required id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword'onChange={onChange}  minLength={5} required id="exampleInputPassword2"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input"  id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
  )
}

export default Signup