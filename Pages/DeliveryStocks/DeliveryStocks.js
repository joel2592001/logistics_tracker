import React, { useEffect, useState } from 'react'
// import Header from '../../components/Header/Header'
import { useEffectOnce } from '../../useEffectonce';

function DeliveryStocks() {

  const [stockDetails, setStockDetails] = useState({name:'',quantity:'',to:''});
  const [options,setOptions] = useState([])
  const [data,setData] =  useState([])

  const [fronthandle,setFrontHandle] = useState({name:false,quantity:false,shop:false})
  const [messageFront,setMessageFront] = useState('')
  

  const get_data=async()=>{
    const request_option = {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({id:localStorage.getItem("log_email")}),
      redirect: 'follow'
    }
    try{
    await fetch(`http://localhost:8888/load_delivery_data`,request_option)
        .then(response => response.json())
        .then(result => {
          setData(result.data);
          get_stocks();
          //console.log(result.data.delivery);
        })
      }catch (error) {
        console.error("Error fetching delevery data:", error);
      }
  }

  const get_stocks=async()=>{
    const request_option = {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({id:localStorage.getItem("log_email")}),
      redirect: 'follow'
    }
    try{
    await fetch(`http://localhost:8888/options`,request_option)
        .then(response => response.json())
        .then(result => {
          if(result.data != null){
            setOptions(result.data);
          }
          console.log(result)
        })
      }catch (error) {
        console.error("Error fetching options data:", error);
      }
  }
  
  useEffectOnce(()=>{
    get_data();
  },[])
  
  const add_details=async()=>{
    const request_option = {
        method: 'POST',
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({data:stockDetails,log_id:localStorage.getItem("log_email")}),
        redirect: 'follow'
    }
    try{
    await fetch(`http://localhost:8888/deliverstocks`,request_option)
        .then(response => response.json())
        .then(result => {
          if(result.success == 'success'){
            setData(result.data)
            get_stocks();
            alert(result.success)
           // console.log(result.data.added)
          }
          else{
            //console.log(result.message)
            alert(result.success)
          }
          // setStockDetails({name:'',quantity:'',id:''})
        })
      }catch (error) {
        console.error("Error fetching delevery data:", error);
      }
        setStockDetails({name:'',quantity:'',to:''})
  }
  
  const stock_name=(e)=>{
    let name_ref = /^(?!null|undefined|\s+$).{4,}$/;
    
    if(name_ref.test(e)){
      setFrontHandle({...fronthandle,name:true})
      setMessageFront('')
    }
    else{
      setMessageFront('Enter a valid stock name')
      setFrontHandle({...fronthandle,name:false})
    }
  }

  const stock_quantity=(e)=>{
        //console.log(e)
      let quantity_ref = /^(?!null|undefined|\s+$)(?!0+$)\d+$/;
      if(quantity_ref.test(e)){
          setFrontHandle({...fronthandle,quantity:true})
          setMessageFront('')
      }
      else{
          setMessageFront('Enter the valid quantity')
          setFrontHandle({...fronthandle,quantity:false})
      }
  }

  const shop_name=(e)=>{
    let name_ref = /^(?!null|undefined|\s+$).{4,}$/;
    if(name_ref.test(e)){
        setFrontHandle({...fronthandle,shop:true})
        setMessageFront('')
    }
    else{
      setMessageFront('Enter the valid name')
      setFrontHandle({...fronthandle,shop:false})
    }
  }

  return (
    < >
      {/* <Header/> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Stock Details</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <div class="btn-group">
                  {/* <label for="recipient-name" class="col-form-label">Available Stocks</label> */}
                  <select class="form-select" value={stockDetails.name} onChange={(e)=> {setStockDetails({...stockDetails,name:e.target.value});stock_name(e.target.value);}} aria-label="Default select example" >
                    <option selected>Availablbe Stocks</option>
                    { options ?
                      options.map((ele)=>{
                          if(ele.quantity > 0){
                            return(
                            <option value={ele.name}>{ele.name.length >= 13 ? ele.name.slice(0,10).toUpperCase()+'...' : ele.name.toUpperCase()}</option>
                            )
                          }
                        }) : <></>
                    }
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Stock Quantity</label>
                <input type="text" value={stockDetails.quantity} onChange={(e)=> {setStockDetails({...stockDetails,quantity:e.target.value});stock_quantity(e.target.value)}} placeholder='Stock Quantity' class="form-control" id="recipient-name"/>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Store Name</label>
                <input type="text" value={stockDetails.to} onChange={(e)=> {setStockDetails({...stockDetails,to:e.target.value});shop_name(e.target.value)}} placeholder='Store Name' class="form-control" id="recipient-name"/>
              </div>
            </div>
            <div style={{textAlign:'center'}}>
              {messageFront?
                  <p style={{color:'red',fontWeight:500}}>{messageFront}</p> : <></>
              }
            </div>
            { fronthandle.name && fronthandle.quantity && fronthandle.shop ?
              <div class="modal-footer">
                <button type="button" onClick={()=>add_details()} class="btn btn-success" data-bs-dismiss="modal">Add Details</button>
              </div> :
              <div class="modal-footer">
                <button type="button" onClick={()=>add_details()} class="btn btn-secondary" data-bs-dismiss="modal">Add Details</button>
              </div>
            }
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 px-3 mt-1 btn-div">
        <button  data-bs-toggle="modal" data-bs-target="#exampleModal" type="button"  >To Deliver</button>
      </div>
      <h3 style={{fontFamily:'-moz-initial',textAlign:'center',fontWeight:'bold',}}>Delivery Details</h3>
      <div className="container">
        <div className="row justify-content-center">   
        {data ?     
          data.map((ele,index)=>{
              return(
              <div key={index} class="col-lg-3 col-md-4 col-12 mb-3">
                <div class="card">
                  <img src="https://img.freepik.com/premium-photo/container-cargo-import-export-business-logistic-3d-rendering_35761-570.jpg" class="card-img-top" alt="..."/>
                  <div class="card-body " style={{background: "lightgrey"}}>
                    <h5 class="card-title">{ele.name.length >= 13 ? ele.name.slice(0,10).toUpperCase()+'...' : ele.name.toUpperCase()}</h5>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Quantity : {ele.quantity} </li>
                      <li class="list-group-item">Shop Name : {ele.address}</li>
                      <li class="list-group-item">Time : {ele.time}</li>
                      <li class="list-group-item">Date : {ele.date}</li>
                    </ul>
                  </div>
                </div>
              </div>
              )
            }) : <></>
        }
        </div>
      </div>
    </>
    
  )
}

export default DeliveryStocks