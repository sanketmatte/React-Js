
import '../styles/customerStyles.css'
import axios from 'axios';
import { useEffect, useState } from "react";
import {FaRegEdit} from 'react-icons/fa'
import {TiDeleteOutline} from 'react-icons/ti'
import {IoIosSave} from 'react-icons/io'
import { Link } from 'react-router-dom';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchmobile, setSearchMobile] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(3);

  const loadCustomers = async() =>{
      try {
        const response = await axios.get('http://localhost:8008/customer/');
        console.log('api call response data: ',response.data)
        setCustomers(
          response.data.map((customer) => ({ ...customer, isEditable: false }))
          .sort((a, b) => new Date(b.doj) - new Date(a.doj))

        );
      } catch (error) {
        console.error(error);
      }  
  };
  
  const filteredCustomers = customers.filter(customer => {
    return customer.mobile.includes(searchmobile);
  });

  const handleSearch = event => {
    setSearchMobile(event.target.value);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCustomers.length / customersPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleEdit = (customer) =>{

    const updatedCustomers = customers.map((c) =>
    c.customer_id === customer.customer_id ? { ...c, isEditable: true } : { ...c, isEditable: false }
    );
    setCustomers(updatedCustomers);
  }
  
  const handleMobileChange = (event, customer) => {
    const { value } = event.target;
    const updatedCustomers = customers.map((c) =>
      c.customer_id === customer.customer_id ? { ...c, mobile: value } : c
    );
    setCustomers(updatedCustomers);
  };
  const handleNameChange = (event, customer) => {
    const { value } = event.target;
    const updatedCustomers = customers.map((c) =>
      c.customer_id === customer.customer_id ? { ...c, name: value } : c
    );
    setCustomers(updatedCustomers);
  };
  
  const handleDelete = async (customer) =>{
    const confirmed = window.confirm("Are you sure you want to Delete the Customer?");
    if(confirmed){
      try {
        await axios.delete(`http://localhost:8008/customer/${customer.customer_id}`);
        const updatedCustomers = customers.filter(c => c.customer_id !== customer.customer_id);
        setCustomers(updatedCustomers);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleSave = async (customer) => {
    const confirmed = window.confirm("Are you sure you want to save the changes?");
    if(confirmed){
      try {
        await axios.put(`http://localhost:8008/customer/${customer.customer_id}/`, customer);
        setCustomers([...customers]);
        customer.isEditable = false;
        alert("Customer Data Saved Successfully!!")
      } catch (error) {
        console.error(error);
      }
    } else{
        customer.isEditable = true;
        setCustomers([...customers]);
    }
    
  }

  return (
    <div className="customer-container">
      <div className="cust-header">
        <span className="header-name">Customers</span>
        {/* <Link to="/home/customers/new">New Customer</Link> */}
        <a href="/home/customers/new"><u>New Customer</u></a>
        <input type='text' placeholder="Search" onChange={handleSearch}></input>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Mobile</th>
            <th>Name</th>
            <th>Since</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer,index) => (
            <tr  key={customer.customer_id}>
            
            <td>{index+1}</td>
            {customer.isEditable ? 
              <td><input type="text" value={customer.mobile} onChange={event => handleMobileChange(event, customer)} /></td> :
              <td><Link to='/home/customers/details' state={{mobile:customer.mobile}} ><u>{customer.mobile}</u></Link></td>
            }
            {customer.isEditable ? 
              <td><input type="text" value={customer.name} onChange={event => handleNameChange(event, customer)} /></td> :
              <td>{customer.name}</td>
            }
            <td>{customer.doj}</td>
            
            
            {customer.isEditable ? 
              <td >
                <div className='action-icons'>
                  <IoIosSave onClick = {() =>handleSave(customer)}/>
                </div>
              </td> :
              <td >
              <div className='action-icons'>
                <FaRegEdit className='edit-icon' onClick={() => handleEdit(customer) }/>
                <TiDeleteOutline className='delete-icon' onClick={() => handleDelete(customer) }/>
              </div>
            </td>
            }
            
          </tr>
        ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>{number}</button>
        ))}
      </div>
    
    </div>
    )
  }
  export default Customers;
