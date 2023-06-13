import React, { useState } from 'react'
// import Header from '../../components/Header/Header'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const Filter_Details = () => {

  const [data,setData] = useState([]);
  const [type,setType] = useState('added');
  const [date,setDate] = useState('');
  const [show,setShow] = useState('');

  const filter_by_date=async()=>{
    var format = function(string) {
      return string.split('-').join('/');
    }
    console.log(format(date))
    let test_date = /^(?!0000\/00\/00)\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/; 
    if(test_date.test(format(date))){
      const request_option = {
        method: 'POST',
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({date:date,filter_type:type,id:localStorage.getItem("log_email")}),
        redirect: 'follow'
      }
      try{
      await fetch(`http://localhost:8888/filter`,request_option)
          .then(response => response.json())
          .then(result => {
            if(result.success == 'success'){
              console.log(result.data)
              setData(result.data)
              setShow(type)
            }
            else{
              alert(result.success)
            }
          })
        }catch (error) {
          console.error("Error fetching filter data:", error);
        }      
    }
    else{
      console.log('enter valid date')
    }
  }
 
  return (
    <>  
        {/* <Header/> */}
        <h2 style={{fontFamily:'-moz-initial',fontWeight:'bold',textAlign:'center',marginTop:20}}>Filter Details</h2>
        <div class="d-flex  mt-3 ms-3">
          <label for='datepicker' style={{display:'flex',alignItems:'center'}}>Select the Date :</label>
          <input class="form-control w-25 " type='date' onChange={(e)=>{setDate(e.target.value)}} id='datepicker'/>
          <label for='type ' style={{display:'flex',alignItems:'center',marginLeft:10}}>Select Type :</label>
          <select id='type' class="form-select w-25 " onChange={(e)=> setType(e.target.value)} aria-label="Default select example" >
            <option value={'added'}>Imported Stocks</option>
            <option value={'delivery'}>Exported Stocks</option>
          </select>
          <div class=" px-3 w-25 mt-1 btn-div">
            <button type="button" onClick={()=>filter_by_date()} >Search</button>
          </div>
        </div>
        <hr/>
        <div class="table-responsive mt-4">
        {data.length > 0 ?
          <table class="table">
            <caption><h3>List of {show} data</h3></caption>
            <thead>
              <tr>
                <th scope="col">SR.NO</th>
                <th scope="col">Stock name</th>
                <th scope="col">Stock Quantity</th>
                <th scope="col">Added Time</th>
                <th scope="col">Added Date</th>
                { show == 'added'?
                <th scope="col">ID </th>:
                <th scope="col">Shop Name</th>
                }
              </tr>
            </thead>
            <tbody>
              { 
                data.map((ele,ind)=>{
                  console.log(ele,'maping')
                  return( 
                    <tr>
                      <th scope="row">{ind + 1}</th>
                      <td>{ele.name.length >= 13 ? ele.name.slice(0,10).toUpperCase()+'...' : ele.name.toUpperCase()}</td>
                      <td>{ele.quantity}</td>
                      <td>{ele.time}</td>
                      <td>{ele.date}</td>
                      { show == 'added'?
                        <td>{ele.id}</td>:
                        <td>{ele.address.length >= 13 ? ele.address.slice(0,10)+'...' : ele.address}</td>
                      }
                    </tr>
                    )
                })
              }
            </tbody>
          </table> : 
          <div>
            <h1 style={{fontFamily:'initial',textAlign:'center',}}>NO DATA</h1><hr/>
          </div>
          }
        </div>
    </>
  )
}

export default Filter_Details