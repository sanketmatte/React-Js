// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState(''); 
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8008/accounts/login/', {
//         email: username,
//         password: password,
//       })
//       // navigate("/home")
//       // if (response.status === 200) {
//       setMessage('Login successful');

//       // } else {
//       //   setMessage('Login failed');
//       // }
//       console.log(response.status); // do something with the response data
//     } 
//   catch (error) {
//       setMessage('Login failed');
//       console.error(error); // handle error
//     }
//   };

//   return (
// <div>
//   <form onSubmit={handleLogin}>
//     <label>
//       Username:
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//     </label>
//     <label>
//       Password:
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//     </label>
//     <button type="submit">Login</button>
//     <div>{message}</div>
//   </form>
// </div>
//   );
// }

// export default Login;
//===================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
import { useAuth } from './auth'
import '../styles/demo.css'
// import '../styles/loginStyles.css'

export const Login = () => {
  // const [user, setUser] = useState('')
  const navigate = useNavigate()
  // const location = useLocation()
  const auth = useAuth()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const redirectPath = location.state?.path || '/'

  const handleLogin = () => {
    const cred = {
      "email": username,
      "password": password,
    }
    auth.login(cred)
    console.log('user authenticated')
    
  }
  const handleRedirect = () => {
    navigate('/home')
  }
  return (
//   
<div className='body'>
{/* <div class="navbar">
  Welcome to the Project Billing Counter Management
</div> */}
<div className="login-container">

<div className="login-form">
  <h2>LOGIN FORM</h2>
  <label>
    Username
    <input type="text" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} />
  </label>
  <label>
    Password
    <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
  </label>
  <button className="login-button" onClick={handleLogin}>Login</button>
</div>
<button  onClick={handleRedirect}>HomePage</button>
</div>
</div> 



  )
}
export default Login;

