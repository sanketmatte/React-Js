import { useAuth } from "./auth"
import { useNavigate } from "react-router-dom"
import '../styles/navBar.css'
// import NavBar from "./SideNavBar"
// import SideNav from './SideNavBar';
// import NavRoutes from '../NavRoutes';
import {AiOutlinePoweroff} from 'react-icons/ai'
import { useEffect } from "react"
import { useState } from "react"

const NavBar = ({ children }) => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [dateString, SetDate] = useState(null)

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }
  const handleRedirect = () => {
    navigate('/')
  }
  
    
    useEffect(() => {
      const now = new Date();
      SetDate(now.toLocaleDateString());
    }, []);

  return (
    <div className="top-nav">
        <span className="nav-welcome">∘∘∘ Welcome, {auth.user.first_name} {auth.user.last_name}.</span>
        <button style={{margin:'auto',marginRight:'30px'}} onClick={handleRedirect}>LoginPage</button>
        <span style={{paddingRight:'30px'}}>{dateString}</span>
        <span className="logout-logo">
          <AiOutlinePoweroff onClick={ handleLogout } />
        </span>
    </div>
  )
}
export default NavBar;
