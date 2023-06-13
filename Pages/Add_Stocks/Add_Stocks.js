import React, { useState } from 'react'
import './Add_Stocks.css'
import { useEffectOnce } from '../../useEffectonce';
// import Header from '../../components/Header/Header';




export default function Add_Stocks(){

  console.log('render multiple')
  const [stockDetails, setStockDetails] = useState({name:'',quantity:'',id:''});
  const [editDetails,setEditDetails] = useState({name:'',quantity:'',id:'',edit_message:''})
  const [data,setData] =  useState([])
  const [deleteName,setDeleteName] = useState('')

  const [fronthandle,setFrontHandle] = useState({name:false,quantity:false,id:false,edit_message:false})
  const [editmessage,seteditmessage] = useState('')
  const [messageFront,setMessageFront] = useState('')
  

  useEffectOnce(()=>{
    getdata();
  },[])

  const getdata=async()=>{
    const request_option = {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({id:localStorage.getItem("log_email")}),
      redirect: 'follow'
    }
    try{
    await fetch(`http://localhost:8888/load_add_data`,request_option)
        .then(response => response.json())
        .then(result => {
          if(result.data != null){
            setData(result.data);
          }
        })
      }catch (error) {
          console.error("Error fetching data First:", error);
        }
  }

  const add_details=async()=>{
    // console.log(stockDetails)
    const request_option = {
        method: 'POST',
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({data:stockDetails,log_id:localStorage.getItem("log_email"),name:'add'}),
        redirect: 'follow'
    }
    try{
    await fetch(`http://localhost:8888/addstocks`,request_option)
        .then(response => response.json())
        .then(result => {
          if(result.success == 'success'){
            setData(result.data)
            setTimeout(function(){
              alert("Stock added successfully");
            }, 3000);
            //console.log(result.data.added)
          }
          else{
            // setMessage(result.message)
            // setTimeout(function(){
            // }, 3000);
            alert(result.success)
            //console.log(result.message)
          }
          
        })
    }catch (error) {
      console.error("Error fetching add data:", error);
    }

        setStockDetails({name:'',quantity:'',id:''})
  }

  const edit_details=async()=>{
    console.log(editDetails)
    const request_option = {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({edit:editDetails.name,quantity:editDetails.quantity,id:localStorage.getItem("log_email")}),
      redirect: 'follow'
    }
    try{
    await fetch(`http://localhost:8888/editstock`,request_option)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if(result.success == 'edited successfully'){
            setData(result.data);
            alert(result.success)
          }
          else{
            alert(result.success)
          }
        })
      }catch (error) {
        console.error("Error fetching edited data:", error);
      }
        //setEditDetails({name:'',quantity:'',id:''})
  }
  
  const delete_details=async()=>{
    const request_option = {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({delete:deleteName,id:localStorage.getItem("log_email")}),
      redirect: 'follow'
    }
    try{
    await fetch(`http://localhost:8888/delete`,request_option)
        .then(response => response.json())
        .then(result => {
          if(result.success == 'deleted successfully'){
            setData(result.data);
            alert(result.success)
          }
          else{
            alert(result.success)
          }
        })
      }catch (error) {
        console.error("Error fetching add data:", error);
      }
  }

  const open_edit_modal=(ele,ind)=>{
    setEditDetails({name:ele.name,quantity:ele.quantity,id:ele.id})
  }

  const stock_name=(e)=>{
    let name_ref = /^(?!null|undefined|\s+$).{4,}$/;;
    
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

  const stock_id=(e)=>{
    let quantity_ref = /^(?!null|undefined|\s+$)(?!0+$)\d+$/;
    if( quantity_ref.test(e)){
        setFrontHandle({...fronthandle,id:true})
        setMessageFront('')
    }
    else{
      setMessageFront('Enter the valid id')
      setFrontHandle({...fronthandle,id:false})
    }
  }

  const edit_quantity=(e)=>{
    let quantity_ref = /^(?!null|undefined|\s+$)(?!0+$)\d+$/;
      if(quantity_ref.test(e)){
          setFrontHandle({...fronthandle,edit_message: true})
          seteditmessage('')
      }
      else{
          seteditmessage('Enter the valid quantity')
          setFrontHandle({...fronthandle,edit_message: false})
      }
  }

  const set_delete_name=(e)=>{
    setDeleteName(e)
    console.log(e)
  }

  return (
    <>
      {/* <Header/>  */}
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Stock Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label for="recipient-name" className="col-form-label">Stock Name</label>
                <input type="text"  value={stockDetails.name} onChange={(e)=> {setStockDetails({...stockDetails,name:e.target.value});stock_name(e.target.value);}} placeholder='Stock Name' className="form-control" id="recipient-name"/>
              </div>
              <div className="mb-3">
                <label for="recipient-name" className="col-form-label">Stock Quantity</label>
                <input type="text" value={stockDetails.quantity} onChange={(e)=> {setStockDetails({...stockDetails,quantity:e.target.value});stock_quantity(e.target.value);}} placeholder='Stock Quantity' className="form-control" id="recipient-name"/>
              </div>
              <div className="mb-3">
                <label for="recipient-name" className="col-form-label">Stock ID</label>
                <input type="text" value={stockDetails.id} onChange={(e)=> {setStockDetails({...stockDetails,id:e.target.value});stock_id(e.target.value);}} placeholder='Stock ID' className="form-control" id="recipient-name"/>
              </div>
            </div>
            <div style={{textAlign:'center'}}>
              {messageFront?
                  <p style={{color:'red',fontWeight:500}}>{messageFront}</p> : <></>
              }
            </div>
            {fronthandle.name && fronthandle.quantity && fronthandle.id  ?
              <div className="modal-footer">
                {/* <button type="button" onClick={()=>setStockDetails({name:'',quantity:'',id:''})} className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button type="submit" onClick={()=>add_details()} className="btn btn-success" data-bs-dismiss="modal">Add Details</button> 
              </div> :
              <div className="modal-footer">
               <button type="button" className="btn btn-secondary" >Add Details</button> 
              </div>
            }
          </div>
        </div>
      </div>
      {/* <!--Edit Modal --> */}
      <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Stock Name : {editDetails.name.length >=30 ?  editDetails.name.slice(0,30)+'...' : editDetails.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">Edit Quantity</label>
                  <input type="text" value={editDetails.quantity}  onChange={(e)=> {setEditDetails({...editDetails,quantity:e.target.value});edit_quantity(e.target.value);}} placeholder='Stock Quantity' className="form-control" id="recipient-name"/>
              </div>
            </div>
            <div style={{textAlign:'center'}}>
              { editmessage ?
                <p style={{color:'red',fontWeight:500}}>{editmessage}</p> : <></>
              }
            </div>
            <div className="modal-footer">
              {fronthandle.edit_message ?
              <button type="submit" onClick={()=>edit_details()} data-bs-dismiss="modal" className="btn btn-primary">Update</button>:
              <button type="button" className="btn btn-primary">Update</button>
              }
            </div>
          </div>
        </div>
      </div>
      {/* delete confirm modal */}
      <div className="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel"aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Delete Data</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Are you sure you want to delete</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                No
              </button>
              <button type="button" onClick={()=>delete_details()} data-bs-dismiss="modal" className="btn btn-primary">yes</button>
            </div>
          </div>
        </div>
      </div>
      {/* add button */}
      <div className="col-sm-12 col-md-12 col-lg-12 px-3 mt-1 btn-div">
        <button  data-bs-toggle="modal" data-bs-target="#exampleModal" type="button"  >ADD</button>
      </div>
      <div>
        <h3 style={{fontFamily:'-moz-initial',textAlign:'center',fontWeight:'bold',}}>Stocks Details</h3>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          { data ?
            data.map((ele,index)=>{
                return(
                <div key={index} className="col-lg-3 col-md-4 col-12 mb-3">
                  <div className="card">
                    <img src="https://img.freepik.com/premium-photo/container-cargo-import-export-business-logistic-3d-rendering_35761-570.jpg" className="card-img-top" alt="..."/>
                    <div className="card-body" style={{background: 'linear-gradient(to right, rgb(255, 81, 38),rgb(255, 47, 144))'}}>
                      <h5 className="card-title">{ele.name.length >= 13 ? ele.name.slice(0,10).toUpperCase()+'...' : ele.name.toUpperCase()} <i onClick={()=>set_delete_name(ele.name)} data-bs-toggle="modal" data-bs-target="#myModal" className="fa-solid fa-trash"></i></h5>
                      
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Quantity : {ele.quantity} <i onClick={open_edit_modal.bind(this,ele,index)} data-bs-target="#editModal" data-bs-toggle="modal" className="fas fa-edit" style={{fontSize:20,marginLeft:10}}></i></li>
                        <li className="list-group-item">Stock ID : {ele.id}</li>
                        <li className="list-group-item">Time : {ele.time}</li>
                        <li className="list-group-item">Date : {ele.date}</li>
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
