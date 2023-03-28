
// import { useAuth } from "./auth"
// import { useNavigate } from "react-router-dom"
// import NavBar from "./SideNavBar"


// import { useAuth } from "./auth"
// import { useNavigate } from "react-router-dom"
// import NavBar from "./SideNavBar"
import '../styles/customerDetails.css'
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';
// import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';


function loadItems(billNumber, setItemList) {
  axios.get('http://localhost:8008/bill-item/', {params:{bill_number:billNumber}})
    .then(response => {
      setItemList(response.data)
    })
    .catch(error => {
      console.error(error);
    });  
}

function loadBill(bill_number, setBill) {
  axios.get('http://localhost:8008/bill/', {params:{bill_number:bill_number}})
    .then(response => {
      setBill(response.data[0])
    })
    .catch(error => {
      console.error(error);
    });  
}


function BillDetails() {
  const location = useLocation();
  const bill_number = location.state?.bill_number;
  const [itemList, setItemList] = useState([])
  const [bill, setBill] = useState([])
  // const [loadbillsnumber, setBillsNumber] = useState(5)
  useEffect(() => {
    loadBill(bill_number, setBill);   //set bill-items    setcustomer customerbills.mobile is customer pk
    loadItems(bill_number, setItemList);   //set bill-items    setcustomer customerbills.mobile is customer pk
  }, [bill_number]);
  if (!bill_number) {
    return <div> Bill Number Details not Found...</div>;
  }
  return (
    <>
    <div className="cust-header">
          <span className="header-name">Bill Details</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}} className='bill-info'>
          <div>
            <div>BILL #:{bill.bill_number}</div>
            <div>MOBILE: {bill.mobile}</div>
            <div>PAYMENT: {bill.payment_mode}</div>

          </div>
          <div>
            <div>DATE : {bill.bill_date}</div>
            <div>CASHIER: {localStorage.getItem('username').toUpperCase()}</div>
            <div>COUNTER: {(window.location.port%100+1).toString().padStart(2,'0')}</div>
          </div>
        </div>
    <table>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item,index) => (
                <tr key={item.item_id}>
                  <td>{index+1}</td>
                  <td>{item.item_name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
              <tr >
                <td colSpan={'4'}>Total</td>
                <td>{bill.amount}</td>               
              </tr>
              <tr >
                <td colSpan={'4'}>GST</td>
                <td>{bill.gst}</td>               
              </tr>
              <tr >
                <td colSpan={'4'}>Grand Total</td>
                <td>{bill.grand_total}</td>               
              </tr>

            </tbody>
          </table> 
      
    </>
  );
  }
  export default BillDetails;
    