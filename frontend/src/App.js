// import './App.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { AuthProvider } from './components/auth';
import { RequireAuth } from './components/RequireAuth';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Welcome from './components/Welcome';
import NewCustomer from './components/NewCustomer';
import CustomerDetails from './components/CustomerDetails';
import NewBill from './components/NewBill';
import BillDetails from './components/BillDetails';
import ProductSales from './components/ProductSales';
import MonthlySales from './components/MonthlySales';
import Customers from './components/Customers';
import Bills from './components/Bills';

function App() {
  return (
    <>

    <Router>

    <AuthProvider>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/home' element={<RequireAuth><Home><Welcome/></Home></RequireAuth>}></Route>
      <Route path='/home/customers' element={<RequireAuth><Home><Customers/></Home></RequireAuth>}></Route>
      <Route path="/home/customers/new" element={<RequireAuth><Home><NewCustomer/></Home></RequireAuth>}></Route>
      <Route path="/home/customers/details" element={<RequireAuth><Home><CustomerDetails/></Home></RequireAuth>}></Route>
      <Route path="/home/bills" element={<RequireAuth><Home><Bills/></Home></RequireAuth>}></Route>
      <Route path="/home/bills/new" element={<RequireAuth><Home><NewBill/></Home></RequireAuth>}></Route>
      <Route path="/home/bills/details" element={<RequireAuth><Home><BillDetails/></Home></RequireAuth>}></Route>
      <Route path="/home/analytics/product-sales" element={<RequireAuth><Home><ProductSales/></Home></RequireAuth>}></Route>
      <Route path="/home/analytics/monthly-sales" element={<RequireAuth><Home><MonthlySales/></Home></RequireAuth>}></Route>
      </Routes>
    </AuthProvider>
    </Router>
    </>
  );
}

export default App;
