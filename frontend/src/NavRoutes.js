import './App.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { AuthProvider } from './components/auth';
import { RequireAuth } from './components/RequireAuth';

// import Dashboard from './components/Dashboard';
import NewCustomer from './components/NewCustomer';
import CustomerDetails from './components/CustomerDetails';
import NewBill from './components/NewBill';
import BillDetails from './components/BillDetails';
import ProductSales from './components/ProductSales';
import MonthlySales from './components/MonthlySales';
import Customers from './components/Customers';
import Bills from './components/Bills';
// import Analytics from './components/Analytics';
import SideNavBar from './components/SideNavBar';
import { BrowserRouter as Router} from 'react-router-dom';


function NavRoutes() {
  return (
    <>
    {/* <Router>       */}
      <SideNavBar >
      <Routes>
        <Route  path="/home/customers" element={<Customers />} />
        <Route exact path="/home/customers/new" component={NewCustomer} />
        <Route exact path="/home/customers/details" component={CustomerDetails} />
        <Route exact path="/home/bills" component={Bills} />
        <Route exact path="/home/bills/new" component={NewBill} />
        <Route exact path="/home/bills/details" component={BillDetails} />
        <Route exact path="/home/analitics" component={Analytics} />
        <Route exact path="/home/analytics/product-sales" component={ProductSales} />
        <Route exact path="/home/analytics/monthly-sales" component={MonthlySales} />
      </Routes>
      </SideNavBar>
      {/* </Router> */}

    </>
  );
}

export default NavRoutes;
