
// import { useAuth } from "./auth"
// import { useNavigate } from "react-router-dom"
// import NavBar from "./SideNavBar"
import {useState} from 'react'
import '../styles/newCustomerStyles.css'
import axios from 'axios'; 

function NewCustomer() {
  const [customer, setCustomer] = useState({
    "name": "",
    "email": "",
    "mobile": "",
    "dob": "",
  });

  // update name and mobile values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  }


  const createCustomer=async(event)=>{
    event.preventDefault()
    try {
      if (customer.dob===''){
        delete customer.dob
      }
      await axios.post('http://localhost:8008/customer/', customer)
      setCustomer({
        "name": "",
        "email": "",
        "mobile": "",
        "dob": "",
      });
      alert('Customer Created Successfully!!')
    } 
    catch (error) {
        console.error(error); 
    }

  }

  return (
    <div >
    <form onSubmit={createCustomer} className='cust-form'>
      <div className='header-name'>New Customer</div>

      <label>NAME</label>
      <input type="text" 
        name="name" 
        value={customer.name} 
        onChange={handleInputChange} 
        required 
      />

      <label>EMAIL</label>
      <input type="email" 
        name="email" 
        value={customer.email} 
        onChange={handleInputChange} 
        required 
      />

      <label>MOBILE</label>
      <input type="text" 
        name="mobile" 
        value={customer.mobile} 
        onChange={handleInputChange} 
        pattern="^\d{10}$" 
        onInvalid={(e) => e.target.setCustomValidity('Please enter a valid 10-digit mobile number')}
        onInput={(e) => e.target.setCustomValidity('')}
        required
      />
      <label>DATE OF BIRTH</label>
      <input type="date" 
        name="dob" 
        value={customer.dob} 
        onChange={handleInputChange} 
        onInvalid={(e) => e.target.setCustomValidity('Please enter a valid date of birth')}
        onInput={(e) => e.target.setCustomValidity('')}
        onBlur={(e) => {
          const selectedDate = new Date(e.target.value);
          const now = new Date();
          if (selectedDate > now) {
            e.target.setCustomValidity('Please select a date before today');
          } else {
            e.target.setCustomValidity('');
          }
        }}
      />
      <button type="submit">Create</button>
    </form>
  </div>
  

  )
}
export default NewCustomer;
