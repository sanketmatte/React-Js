
// import { useAuth } from "./auth"
// import { useNavigate } from "react-router-dom"
// import NavBar from "./SideNavBar"
import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/bills.css'
import axios from "axios";

function Bills() {
    // const initialSearchState = {
    //   "bill_number": null,
    //   "bill_date": null,
    //   "counter": null,
    //   "cashier": null,
    //   "mobile": null
    // }
    const [currentCustomersbills, setCustomerBills] = useState([])
    const [billsearch, setBillSearch] = useState({})
    const [billsfilter, setBillFilter] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(3);
    // const [customer, setCustomer] = useState()

    // const [filteredBills, setFilteredBills] = useState([])

    
    
    // const filteredCustomers = currentCustomersbills.filter(bills => {
    //   // return bills.mobile.includes(searchmobile);
    //   //add code here to check from billsfilter and filter data 
    // });

    const filteredBills = currentCustomersbills.filter((bill) => {
      for (const [key, value] of Object.entries(billsfilter)) {
        if (!bill[key] || !bill[key].toString().includes(value.toString())) {
          return false; // skip this bill if any condition fails
        }
      }
      return true; // include this bill if all conditions pass
    });

    
    


    const handleAPISearch = (event) =>{
      event.preventDefault()
      console.log('dont call the api: ',billsearch==={})
      if (Object.keys(billsearch).length === 0) {
        alert("Please enter search criteria");
        return;
      }
      try {
        console.log(billsearch)
         axios.get('http://localhost:8008/bill/', {params:billsearch})
        .then(response => {
          // console.log("reponse data",response.data)
          // console.log("isempty",response.data.length===0)
          if(!response.data.length){
            alert("No Records Found!!")
          }else{
          setCustomerBills(response.data)
          }
          // setFilteredBills(response.data);

        })
        setBillSearch({})
        
        event.target.reset();
        
      } 
      catch (error) {
          console.error(error); 
      }
    }

    const handleSearchInputChange = (event) => {
      const { name, value } = event.target;
      if (value === '') {
        const {[name]: removedKey, ...rest} = billsearch;
        setBillSearch(rest);
      } else {
        setBillSearch({ ...billsearch, [name]: value });
      }
    }

    const handleFilterInputChange = (event) => {
      const { name, value } = event.target;
      if (value === '') {
        const {[name]: removedKey, ...rest} = billsfilter;
        setBillFilter(rest);
      } else {
        setBillFilter({ ...billsfilter, [name]: value });
      }
    }

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentBills = filteredBills.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBills.length / customersPerPage); i++) {
      pageNumbers.push(i);
    }
    // const getCustomer = (mobile) =>{
      // try {
      //   console.log(mobile)
      //   axios.get('http://localhost:8008/customer/', {params:{mobile:mobile}})
      //   .then(response => {
      //     console.log(response.data)
      //     setCustomer( response.data[0])
      //   })
        
      // } 
      // catch (error) {
      //     console.error(error); 
      // }
    // }

    const handleGetAllBills = () => {
      try {
         axios.get('http://localhost:8008/bill/')
        .then(response => {
          setCustomerBills(response.data)
          // setFilteredBills(response.data);
        })        
      }catch (error) {
        console.error(error); 
      }
    }
    

     return (
      <>
        <div className="cust-header">
        <span className="header-name">Bills</span> 
        {/* <a href="/home/bill/new"><u>New Bill</u></a> */}
        <Link to='/home/bills/new'><u>New Bill</u></Link>

        </div>
        
        <div className="search-filter">
          <div className="name">Search filter</div>
          <form onSubmit={handleAPISearch}>           
          <input type='text' name='mobile' placeholder="Mobile" onChange={handleSearchInputChange}></input>
          <input type='text' name='bill_number' placeholder="Bill No" onChange={handleSearchInputChange}></input>
          <input type='date' name='bill_date' placeholder="Date" onChange={handleSearchInputChange}></input>
          <input type='text' name='counter' placeholder="Counter" onChange={handleSearchInputChange}></input>
          <input type='text' name='cashier' placeholder="Cashier" onChange={handleSearchInputChange}></input>
          <button type="submit">Search </button>
        </form>
        <button onClick={handleGetAllBills}>Get all Bills </button>
        </div>
        
          
        <table className='bills-table'>
          
        <thead>
          <tr className="search">
              <td></td>
              <td><input type='text' name='bill_number' placeholder="Bill No" onChange={handleFilterInputChange}></input></td>
              <td><input type='text' name='mobile' placeholder="Mobile" onChange={handleFilterInputChange}></input></td>
              <td><input type='text' name='amount' placeholder="Amount" onChange={handleFilterInputChange}></input></td>
              <td><input type='text' name='bill_date' placeholder="Date" onChange={handleFilterInputChange}></input></td>
              <td><input type='text' name='counter' placeholder="Counter" onChange={handleFilterInputChange}></input></td>
              <td><input type='text' name='cashier' placeholder="Cashier" onChange={handleFilterInputChange}></input></td>
          </tr>
          <tr>
            <th>Sr</th>
            <th>Bill</th>
            <th>Mobile</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Counter</th>
            <th>Cashier</th>
          </tr>
        </thead>
        <tbody>
        
          {currentBills.map((customerbill,index) => (
            <tr  key={customerbill.bill_id}>
              <td>{index+1}</td>
              <td><Link to='/home/bills/details' state={{bill_number:customerbill.bill_number}} ><u>{customerbill.bill_number}</u></Link></td>
              <td><Link to='/home/customers/details' state={{mobile:customerbill.mobile}} ><u>{customerbill.mobile}</u></Link></td>
              <td>{customerbill.amount}</td>
              <td>{customerbill.bill_date}</td>
              <td>{customerbill.counter}</td>
              <td>{customerbill.cashier}</td>

            </tr>
        ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>{number}</button>
        ))}
      </div>
        
      </>
    )
  }
  export default Bills;
    