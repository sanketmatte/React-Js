// import { useState } from 'react';
// // import './App.css';
// import '../styles/sideNavBar.css'
// import { Link,Route } from 'react-router-dom';

// function SideNavBar() {
//   const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
//   const [showBillDropdown, setShowBillDropdown] = useState(false);
//   const [showAnalyticsDropdown, setShowAnalyticsDropdown] = useState(false);

//   const toggleCustomerDropdown = () => {
//     setShowCustomerDropdown(!showCustomerDropdown);
//     setShowBillDropdown(false);
//     setShowAnalyticsDropdown(false);
//   };

//   const toggleBillDropdown = () => {
//     setShowBillDropdown(!showBillDropdown);
//     setShowCustomerDropdown(false);
//     setShowAnalyticsDropdown(false);
//   };

//   const toggleAnalyticsDropdown = () => {
//     setShowAnalyticsDropdown(!showAnalyticsDropdown);
//     setShowCustomerDropdown(false);
//     setShowBillDropdown(false);
//   };

//   return (
//         <div className="App">
//           <div className="sidebar">
//             <div className="sidebar-header">
//               <h3>Dashboard</h3>
//             </div>
//             <ul className="sidebar-menu">
//               <li>
//                 <Link to="/customers">Customers</Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link to="/customers/new">New Customer</Link>
//                   </li>
//                   <li>
//                     <Link to="/customers/details">Customer Details</Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <Link to="/bills">Bills</Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link to="/bills/new">New Bill</Link>
//                   </li>
//                   <li>
//                     <Link to="/bills/details">Bill Details</Link>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <Link to="/analytics">Analytics</Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link to="/analytics/monthly-sales">Monthly Sales</Link>
//                   </li>
//                   <li>
//                     <Link to="/analytics/product-sales">Product Sales</Link>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </div>
//           <div className="content">
//             {/* <Switch>
//               <Route path="/customers/new">
//                 <NewCustomer />
//               </Route>
//               <Route path="/customers/details">
//                 <CustomerDetails />
//               </Route>
//               <Route path="/bills/new">
//                 <NewBill />
//               </Route>
//               <Route path="/bills/details">
//                 <BillDetails />
//               </Route>
//               <Route path="/analytics/monthly-sales">
//                 <MonthlySales />
//               </Route>
//               <Route path="/analytics/product-sales">
//                 <ProductSales />
//               </Route>
//             </Switch>  */}
//           </div>
//         </div>
//       );
// }

// export default SideNavBar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sideNavBar.css'

const SideNavBar = () => {
  const [showCustomers, setShowCustomers] = useState(false);
  const [showBills, setShowBills] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const toggleCustomers = () => setShowCustomers(!showCustomers);
  const toggleBills = () => setShowBills(!showBills);
  const toggleAnalytics = () => setShowAnalytics(!showAnalytics);

  return (
    <div className="sidenav">
      <div className='nav-buttons'>
      <div className="sidenav-section">
        <div className="sidenav-section-header" onClick={toggleCustomers}>
          <span><Link to="/home/customers">Customers</Link></span>
          <span className="dropdown-icon">{showCustomers ? '⯅' : '⯆'}</span>
        </div>
        {showCustomers && (
          <ul>
            <li className="sidenav-sub-section">
              <Link to="/home/customers/new">New Customer</Link>
            </li>
            <li className="sidenav-sub-section"> 
              <Link to="/home/customers/details">Customer Details</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="sidenav-section">

        <div className="sidenav-section-header" onClick={toggleBills}>
          <span><Link to="/home/bills">Bills</Link></span>

          <span className="dropdown-icon">{showBills ? '⯅' : '⯆'}</span>
        </div>
        {showBills && (
          <ul>
            <li className="sidenav-sub-section" >
              <Link to="/home/bills/new">New Bill</Link>
            </li>
            <li className="sidenav-sub-section">
              <Link to="/home/bills/details">Bill Details</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="sidenav-section">
        <div className="sidenav-section-header" onClick={toggleAnalytics}>
          <span>Analytics</span>
          <span className="dropdown-icon">{showAnalytics ? '⯅' : '⯆'}</span>
        </div>
        {showAnalytics && (
          <ul>
            <li className="sidenav-sub-section">
              <Link to="/home/analytics/product-sales">Product Sales</Link>
            </li>
            <li className="sidenav-sub-section">
              <Link to="/home/analytics/monthly-sales">Monthly Sales</Link>
            </li>
          </ul>
        )}
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;

