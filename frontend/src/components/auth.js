import { useState, createContext, useContext } from 'react'
import axios from 'axios';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null)
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'x-csrftoken'
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthentication] = useState(localStorage.getItem('isAuthenticated'))
  const [user, setUser] = useState({
    'username':localStorage.getItem('username'),
    'email':localStorage.getItem('email'),
    'first_name':localStorage.getItem('first_name'),
    'last_name':localStorage.getItem('last_name')
  })
  const navigate = useNavigate()

  const login = cred => {
    try {
        axios.post('http://localhost:8008/accounts/login/', cred).then(response => {
          console.log(response.status); // do something with the response data
          console.log(response); // do something with the response data
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('first_name', response.data.first_name);
          localStorage.setItem('last_name', response.data.last_name);
          setAuthentication(true);
          setUser({
            'username':response.data.username,
            'email':response.data.email,
            'first_name':response.data.first_name,
            'last_name':response.data.last_name
          })
          navigate('/home')

        });
    } 
    catch (error) {
        console.error(error); // handle error
        localStorage.setItem('isAuthenticated', false);
    }
  }

  const logout = () => {
    try {
        const response =  axios.post('http://localhost:8008/accounts/logout/',{}).then(response => {
          setAuthentication(false)
          setUser({})
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('username');
          localStorage.removeItem('email');
          localStorage.removeItem('first_name');
          localStorage.removeItem('last_name');
        })
        console.log(response.status); // do something with the response data
    } 
    catch (error) {
        console.error(error); // handle error
    }
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated ,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}