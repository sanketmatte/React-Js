
// import { useAuth } from "./auth"
// import { useNavigate } from "react-router-dom"
// import NavBar from "./SideNavBar"
import '../styles/customerDetails.css'
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';


function loadBills(customerMobile, setCustomerBills) {
  axios.get('http://localhost:8008/bill/', {params:{mobile:customerMobile}})
    .then(response => {
      setCustomerBills(response.data)
    })
    .catch(error => {
      console.error(error);
    });  
}
function loadCustomer(customerMobile, setCustomer) {
  axios.get('http://localhost:8008/customer/', {params:{mobile:customerMobile}})
    .then(response => {
      setCustomer(response.data[0])
    })
    .catch(error => {
      console.error(error);
    });  
}

function CustomerDetails() {
  const location = useLocation();
  const mobile = location.state?.mobile;
  const [customer, setCustomer] = useState([])
  const [customerbills, setCustomerBills] = useState([])
  const [loadbillsnumber, setBillsNumber] = useState(5)
  const currentCustomersbills = customerbills.slice(0, loadbillsnumber);

 
  const handleClick = () => {
    setBillsNumber(prev => prev + 5)
  }
  useEffect(() => {
    loadBills(mobile, setCustomerBills);
    loadCustomer(mobile, setCustomer)
  }, [mobile]);

  if (!mobile) {
    return <div> Customer Mobile Details not Found...</div>;
  }

  return (
    <>
    <div className="customer-details">
      <div className='header-name'>Customer Details</div>
      <div className='details'>
      <p><span>NAME</span> {customer.name}</p>
      <p><span>MOBILE</span> {customer.mobile}</p>
      <p><span>EMAIL</span> {customer.email}</p>
      <p><span>DOB</span>{customer.dob}</p>
      </div>
    </div>
    <table className='bills-table'>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Bill</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>

          </tr>
        </thead>
        <tbody>
        
          {currentCustomersbills.map((customerbill) => (
            <tr  key={customerbill.bill_id}>
              <td>{customerbill.bill_id}</td>
              <td><Link to='/home/bills/details' state={{bill_number:customerbill.bill_number}} ><u>{customerbill.bill_number}</u></Link></td>
              <td>{customerbill.bill_date}</td>
              <td>{customerbill.amount}</td>

              <td>{customerbill.payment_mode}</td>
            </tr>
        ))}
        </tbody>
      </table> 
      {customerbills.length>loadbillsnumber?
        <div style={{textAlign:"right",cursor:'pointer',marginTop:'10px'}} onClick={handleClick} ><u>Click here to See more Transaction</u></div>:
        <div></div>
      }
    </>
  );
  }
  export default CustomerDetails;
    