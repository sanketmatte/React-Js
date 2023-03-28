import NavBar from "./Navbar"
import SideNav from './SideNavBar';
import '../styles/home.css'


const Home = (prop ) => {
 
  return (
  <div className="home">
      <NavBar/>
      <div className="home-container">
        <SideNav />
        <div className="content">
        {prop.children}
        </div>
      </div>
      {/* <NavRoutes /> */}



    </div>
  )
}
export default Home;
