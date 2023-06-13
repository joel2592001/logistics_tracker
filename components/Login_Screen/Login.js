import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import logistic from '../../assets/logistic.png'


export default function Login({state}){
    const [log,setLog] = useState({email:'',pass:''})
    const [message,setMessage] = useState('')
    const [front,setFront] = useState({email:false,pass:false})
    const [btn,setBtn] = useState(false)

    const navigate = useNavigate();

    const login=async()=>{
        const request_option = {       
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({data:log}),
            redirect: 'follow'
          }
          try{
            await fetch('http://localhost:8888/login',request_option)
            .then((response) => response.json())
            .then((json) => {
                if(json.success == 'correct'){
                    navigate('/home',{replace:true})
                    //state()
                    localStorage.setItem("log_email",log.email);
                }
                else if(json.success != 'correct'){
                    alert('Wrong Email or Password');
                }
                console.log(json.success)
                setBtn(false)
            })
        }catch (error) {
            console.error("Error fetching login data:", error);
          }
        
    }

    const frontemail=(e)=>{
        let email_ref = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if(email_ref.test(e)){
            setFront({...front,email:true})
            setMessage('');
        }
        else{
            setMessage('Email must be in formate')
            setFront({...front,email:false})
        }
        //console.log(e)
    }

    const frontpass=(e)=>{
        if(e.length < 6){
            setMessage('Password length wrong')
            setFront({...front,pass:false})
        }
        else{
            setFront({...front,pass:true})
            setMessage('');
        }
    }

  return (
 <div class="form">
        <div class="form-container d-flex">
            <div class="form-page col-sm-12 col-md-12 col-lg-6">
                <form action="">
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 mb-2">
                        <label for="inputEmail4" class="form-label">Your Email</label>
						<input type="email" class="form-control py-2" id="inputEmail4" onChange={(e)=> {setLog({...log,email:e.target.value});frontemail(e.target.value);setBtn(true)}} placeholder="Your email"/>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 mb-2">
                        <label for="inputEmail4" class="form-label">Your Password</label>
						<input type="password" class="form-control py-2" id="inputEmail4" onChange={(e)=> {setLog({...log,pass:e.target.value});frontpass(e.target.value);setBtn(true)}} placeholder="Your Password"/>
                    </div>
                    <div style={{textAlign:'center'}}>
                        { message ?
                            <p style={{color:'red',fontWeight:500}}>{message}</p> : <></>
                        }
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 mt-1 btn-div">
                       { front.email && front.pass && btn?
                            <button type="button" onClick={()=> login()} class="btn btn-success">Login</button>:<button type="button" class="btn btn-secondary">Login</button>
                        } 
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 px-3 mb-2">
                        <span>Don't have an account?</span> <Link to={'/register'}>Signup</Link>
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
