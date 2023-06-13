import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
//import logistic from '../../assets/logistic.png'
import "./Header.css"

export default function Header({state}) {
  const navigate = useNavigate();

  const logout=()=>{
    // navigate('/')
    navigate('/',{replace:true})
    localStorage.removeItem("log_email");
  }

  return (
    <nav class="navbar navbar-expand-lg " id='header'>
      <div class="container-fluid">
        {/* <a class="navbar-brand" href="#">Navbar</a> */}
        <div style={{alignItems:'center',justifyContent:'center',marginBottom:-12,marginRight:20}}>
        <Link to={'/home'} class="nav-link" >
            <i class="fa-solid fa-mountain-city" style={{fontSize:40,color: "#000000"}}></i>  
            <p style={{fontFamily:'serif',fontSize:7.4,color:'black'}}>Logistic Tracker</p>
        </Link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-lg-flex justify-content-lg-between " id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to={'/add_stocks'} class="nav-link" style={{fontWeight:400,fontFamily:'revert',color:'black'}}><i class="fa-solid fa-boxes-packing" style={{color: "#000000"}}></i> Add Stocks</Link>
            <Link to={'/deliver_stocks'} class="nav-link" style={{fontWeight:400,fontFamily:'revert',color:'black'}}><i class="fa-solid fa-truck" style={{color: "#000000"}}></i> Deliver Stocks</Link>
            <Link to={'/filter_stocks'} class="nav-link" style={{fontWeight:400,fontFamily:'revert',color:'black'}}><i class="fa-solid fa-filter" style={{color: "#000000"}}></i> Filter Stocks</Link>
            <Link to={'/logistics_chart'} class="nav-link" style={{fontWeight:400,fontFamily:'revert',color:'black'}}><i class="fa-sharp fa-solid fa-chart-simple" style={{color: "#000000"}}></i> Chart</Link>
          </div>
          <div class="dropdown ">
              <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown"><img src="https://www.w3schools.com/howto/img_avatar.png" style={{height:50,width:50,borderRadius:50}} alt="Avatar" class="avatar"/></a>
              <div class="dropdown-menu dropdown-menu-lg-end text-center ">   
                <button type="button" onClick={()=>logout()} class="btn btn-light ">Logout</button>    
              </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 