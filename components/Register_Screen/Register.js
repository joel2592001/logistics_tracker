import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import logistic from '../../assets/logistic.png'

export default function Register(){
    const [reg,setReg] = useState({name:'',email:'',pass:''})
    const [fronthandle,setFrontHandle] = useState({name:false,email:false,pass:false})
    const [messageFront,setMessageFront] = useState('')
    const [message,setMessage] = useState('')
    const [btn,setbtn] = useState(false)

    const navigate = useNavigate();

    const Register=async()=>{
        console.log(reg)

        const request_option = {
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({data:reg}),
            redirect: 'follow'
        }
        try{
        await fetch('http://localhost:8888/register',request_option)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.success !== 'Registered successfully')
                {
                    setMessage(result.success)
                    setTimeout(() => {
                        setMessage('')
                    }, 3500);
                }
                else if(result.success === 'Registered successfully')
                {
                    alert(result.success);
                    navigate('/')
                }
                setbtn(false)
            })
        }catch (error) {
            console.error("Error fetching register data:", error);
          }
    }

    const frontvalname=(e)=>{
        let name_ref = /^(?!null|undefined|\s+$)\S.{3,}$/;
    
        if(name_ref.test(e)){
          setFrontHandle({...fronthandle,name:true})
          setMessageFront('')
        }
        else{
          setMessageFront('three char & not contain special char')
          setFrontHandle({...fronthandle,name:false})
        }
    }
    
    const frontvalemail=(e)=>{
        console.log(e)
    let email_ref = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(email_ref.test(e)){
        setFrontHandle({...fronthandle,email:true})
        setMessageFront('')
    }
    else{
        setMessageFront('Email must be in formate')
        setFrontHandle({...fronthandle,email:false})
    }
    }
    
    const frontvalpass=(e)=>{
        if(e.length < 6){
            setMessageFront('password must be six char long')
            setFrontHandle({...fronthandle,pass:false})
        }
        else{
            setFrontHandle({...fronthandle,pass:true})
            setMessageFront('')
        }
    }
    
  return (
     <div class="form">
        <div class="form-container d-flex">
            <div class="form-page col-sm-12 col-md-12 col-lg-6">
                <form action="">
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 mb-2">
                        <label for="inputEmail4" class="form-label">Your Name</label>
						<input type="text" class="form-control py-2" id="inputEmail4" onChange={(e)=> {setReg({...reg,name:e.target.value});frontvalname(e.target.value);setbtn(true)}} placeholder="Your Name"/>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 mb-2">
                     <label for="inputEmail4" class="form-label">Your Email</label>
					    <input type="email" class="form-control py-2" id="inputEmail4" onChange={(e)=> {setReg({...reg,email:e.target.value});frontvalemail(e.target.value);setbtn(true)}} placeholder="Your email"/>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 mb-2">
                     <label for="inputEmail4" class="form-label">Your Password</label>
						<input type="password" class="form-control py-2" id="inputEmail4" onChange={(e)=> {setReg({...reg,pass:e.target.value});frontvalpass(e.target.value);setbtn(true)}} placeholder="Your Password"/>
                    </div>
                    <div style={{textAlign:'center',marginBottom:-20}}>
                        {messageFront?
                            <p style={{color:'red',fontWeight:500}}>{messageFront}</p> : <></>
                        }
                        { message ?
                            <p style={{color:'red',fontWeight:500}}>{message}</p> : <></>
                        }
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 btn-div">
                       { fronthandle.name && fronthandle.email && fronthandle.pass && btn?
                            <button type="button" onClick={()=> Register()} >Register</button>:<button type="button">Register</button>
                        }
                    </div>
                    <div style={{alignItems:'center',justifyContent:'center'}}>
                        <span>Already have an account?</span> <Link to={'/'}>Signin</Link>
                    </div>
                </form>
                
            </div>
            <div class="img-page col-6">
                <div style={{alignItems:'center',display:'flex',justifyContent:'center',marginTop:100}}>
                    <img src={logistic} width={200} height={200}  alt=''/>
                </div>
                <div style={{alignItems:'center',display:'flex',justifyContent:'center',marginTop:20}}>
                    <h1 style={{fontFamily:'serif',fontWeight:'bolder',color:'black'}}>Logistic Tracker</h1>
                </div>
                <p style={{textAlign:'center',fontSize:10}}>A SUITE OF ENTERPRISE SERVICES & PRODUCTS FOR THE WORLD OF LOGISTICS & TRADE</p>
            </div>
            </div>
    </div> 
  )
}
