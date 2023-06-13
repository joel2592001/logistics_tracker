import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEffectOnce } from '../../useEffectonce';
// import Header from '../../components/Header/Header';
Chart.register(...registerables);

const Logistics_Chart = () => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Stock Quantity',
        backgroundColor: 'linear-gradient(to right, rgb(255, 51, 0),rgb(255, 0, 119))',
        borderColor: 'rgba(219, 79, 79, 0.77)',
        borderWidth: 2,
        data: [0], 
      },
    ],
  });

  const getDetails=async()=>{
    const request_option = {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({id:localStorage.getItem("log_email")}),
      redirect: 'follow'
    }
    try{
      await fetch(`http://localhost:8888/chart`,request_option)
          .then(response => response.json())
          .then(result => {

            const labels = result.data.map(ele => ele.name.length >= 13 ? ele.name.slice(0,10).toUpperCase()+'...' : ele.name.toUpperCase());
            const quantities = result.data.map(ele => ele.quantity);

            setChartData(prevState => ({
              ...prevState,
              labels,
              datasets: [
                {
                  ...prevState.datasets[0],
                  data: quantities
                }
              ]
            }));
            console.log(result)
          })
        }
        catch (error) {
          console.error("Error fetching chart data:", error);
        }
  }

  useEffectOnce(() => {
    getDetails();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <h3 style={{fontFamily:'-moz-initial',textAlign:'center',fontWeight:'bold',marginTop:10}}>Stock Details in Chart Formate</h3>
      <div style={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
        <div style={{ width: "70%",height:'120%',marginTop:90 }}>
          {chartData.labels.length > 0 ? 
            <Bar data={chartData}
              options={{plugins: {title: {display: true,text: 'Logistics chart',font: { size: 20 },},
              legend: {display: true,position: 'right',},},maintainAspectRatio: false, responsive: true,
              }}/>: 
            <p style={{textAlign:'center',fontFamily:'monospace'}}>No data</p> 
          }
        </div>
      </div>
    </>
  );
};

export default Logistics_Chart;
