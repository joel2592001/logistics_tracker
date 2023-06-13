import './App.css';
import Login from './components/Login_Screen/Login';
import Register from './components/Register_Screen/Register';
import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom';
import Header from "./components/Header/Header"

import Add_Stocks from './Pages/Add_Stocks/Add_Stocks';
import DeliveryStocks from './Pages/DeliveryStocks/DeliveryStocks';
import Home from './Pages/Home/Home';
import Filter_Details from './Pages/Filter_Details/Filter_Details';
import Logistics_Chart from './Pages/Logistics_Chart/Logistics_Chart';




export default function App() {

  return (
    <>
      <Router>
            <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/*"
            element={
              <>
              <Header/>
              <Routes>
              <Route path="/home" element={<Home/>}></Route>
              <Route path="/add_stocks" element={<Add_Stocks/>}></Route>
              <Route path="/deliver_stocks" element={<DeliveryStocks/>}></Route>
              <Route path="/filter_stocks" element={<Filter_Details/>}></Route>
              <Route path="/logistics_chart" element={<Logistics_Chart/>}></Route>
              </Routes>
              </>
            }
            />
          </Routes>
      </Router>
    </>
  );
}

