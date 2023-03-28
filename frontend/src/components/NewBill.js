
// import { useAuth } from "./auth"
// import { useNavigate } from "react-router-dom"
// import NavBar from "./SideNavBar"
import axios from 'axios';
import '../styles/newBill.css'
import {TiDeleteOutline} from 'react-icons/ti'

import { useEffect, useState } from "react";
function NewBill() {
    const [itemList, setItemList] = useState([])
    const intialState = {'item_id':itemList.length+1}
    const initialCalculations = {'totalAmount':0,'gst':0,'grandTotal':0}
    const [item, setItem] = useState(intialState)
    const [calculations, setCalculations] = useState(initialCalculations)
    const [customer, setCustomerFound] = useState()
    const [paymentMode, setPaymentMode] = useState()
    const [datetimeString, SetDateTime] = useState(null)
    function displayTime() {
      const now = new Date();
      const dateString = now.toLocaleDateString();
      const timeString = now.toLocaleTimeString([], {timeStyle: 'short'});
      // const timeString = now.toLocaleTimeString({ hour: 'numeric', minute: 'numeric', hour12: true });
      const datetimeString = `${dateString} ${timeString}`;
      return datetimeString
    }
    
    useEffect(() => {
      setInterval(() => SetDateTime(displayTime()), 1000);
    }, []);

    // const calculateGrandTotal =(list)=>{

    // }
    const handleCustomerSearch = (event) =>{
      event.preventDefault()
      const mobileSearch = event.target.elements.mobile.value;
      try {
        console.log('mobile number', mobileSearch)
         axios.get('http://localhost:8008/customer/', {params:{mobile:mobileSearch}})
        .then(response => {
          setCustomerFound(response.data[0])
        }) 
      } 
      catch (error) {
          console.error(error); 
      }
    }


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (value === '') {
        //destructor 
        const { [name]: removedKey, ...rest } = item;
        setItem(rest);
      } else {
        setItem({ ...item, [name]: value });

      }
    }

    
    const handleCheckout = async(event) => {

      event.preventDefault();
      console.log('customer',customer)
      console.log('paymentmode',paymentMode)

      const billdata = {
        mobile:customer.mobile,
        counter:window.location.port%100+1,
        cashier:'sanket',
        amount:calculations.totalAmount,
        gst:calculations.gst,
        grand_total:calculations.grandTotal,
        payment_mode: paymentMode
      }
      
      console.log('inside handle checkout billdata', billdata)
      try {
         await axios.post('http://localhost:8008/bill/', billdata)///pass bill data
        .then(response => {
            postBillItems(response.data)
            alert("Bill Generated Successfully!!")
          }) 
      } 
      catch (error) {
          console.error(error); 
      }
      // event.default.reset()

      
    }

    const postBillItems = async(billresponse) =>{
      
        try {
          itemList.forEach(async(item) => {
          await axios.post('http://localhost:8008/bill-item/', {...item, bill_number: billresponse.bill_number})
          .then(response => {
            // handle successful response
            console.log(response.data);
          })
        });
        setItemList([])
        setCalculations(initialCalculations)
        setPaymentMode()
        
        } catch (error) {
          console.error(error);
        }
      
      
    }

    const handleAddItem = (event) => {
      event.preventDefault();
      console.log('inside handle add item')
      const new_item = {...item, amount:item.price*item.quantity}
      const new_list = [...itemList, new_item]
      setItemList(new_list)
      var totalAmount = new_list.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2);
      var gst = totalAmount*0.18.toFixed(2);
      var grandTotal = (parseFloat(totalAmount) + parseFloat(gst)).toFixed(2);
      setCalculations({totalAmount:totalAmount,gst:gst,grandTotal:grandTotal})
      setItem(intialState)
      event.target.reset();

    }

    const handelRemoveItem = (delItem) =>{
      
    const confirmed = window.confirm("Are you sure you want to Remove the item?");
    if(confirmed){
      //Set new calculation on del here
      const rest = itemList.filter(item => item !== delItem);
      setItemList(rest);
      // setCalculations({totalAmount:calculations.totalAmount-removedItem.total,gst:calculations.gst-removedItem.gst,grandTotal:calculations.grandTotal-removedItem.grand_total})
      console.log('rest', rest)
      console.log('itemlist', itemList)
      
      var totalAmount = rest.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2);
      var gst = totalAmount*0.18.toFixed(2);
      var grandTotal = (parseFloat(totalAmount) + parseFloat(gst)).toFixed(2);

      setCalculations({totalAmount:totalAmount,gst:gst,grandTotal:grandTotal})
      console.log(calculations)
    }
    }
    
    return (
      <>
        <div className="cust-header">
          <span className="header-name">New Bill</span>
        </div>
        <div className='customer-search'>
          <div>
            <form onSubmit={handleCustomerSearch}>
            <label>MOBILE</label>
            <div className='search-input'>
              <input type="text" name='mobile' pattern="^\d{10}$" 
                onInvalid={(e) => e.target.setCustomValidity('Please enter a valid 10-digit mobile number')}
                onInput={(e) => e.target.setCustomValidity('')}
                required></input>
              <button type='submit'>SEARCH</button>
            </div>
            </form>
          </div>
          <div>
            <div>DATE : {datetimeString}</div>
            <div>CASHIER: {localStorage.getItem('username').toUpperCase()}</div>
            <div>COUNTER: {(window.location.port%100+1).toString().padStart(2,'0')}</div>
          </div>
        </div>
        {customer&&(<>
        <form onSubmit={handleAddItem}>
            <div className='form-input'>
              <div>
                <label>ITEM</label>
                <input type="text" name='item_name' onChange={handleInputChange} required></input>
              </div>
              <div>
                <label>PRICE</label>
                <input type="number" name='price' step='any' onChange={handleInputChange} required></input>
              </div>
              <div>
                <label>QUANTITY</label>
                <input type="number" name='quantity' onChange={handleInputChange} required></input>
              </div>
              <button type='submit'>Add Item</button>
            </div>
          </form>
        <form onSubmit={handleCheckout}>
          <table>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => (
                <tr key={item.item_id}>
                  <td>{item.item_id}</td>
                  <td>{item.item_name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.amount}</td>
                  <td><TiDeleteOutline className='delete-icon' style={{color:"#4F8EF7"}} onClick={() => handelRemoveItem(item) }/></td>
                  
                </tr>
               
              ))}
              <tr >
                <td colSpan={'4'}>Total</td>
                <td>{calculations.totalAmount}</td>               {/*      add the sum of amount here   */}
                <td></td>
              </tr>
              <tr >
                <td colSpan={'4'}>GST</td>
                <td>{calculations.gst}</td>               {/*      add the sum of amount here   */}
                <td></td>
              </tr>
              <tr >
                <td colSpan={'4'}>Grand Total</td>
                <td>{calculations.grandTotal}</td>               {/*      add the sum of amount here   */}
                <td></td>
              </tr>

            </tbody>
          </table>
          <div className='checkout-form'>
            <select id="my-select" name="my-select" onChange={(event)=>setPaymentMode(event.target.value)} required>
              <option  value="">Payment Mode</option>
              <option value="1">UPI</option>
              <option value="2">CARD</option>
              <option value="3">CASH</option>
            </select>

            <button type='submit'>Checkout</button>

          </div>
        </form></>)}
      </>
    )
  }
  export default NewBill;
