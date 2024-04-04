import './App.css'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { setIsAuthorized, setUser } from './features/auth/authSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const { isAuthorized } = useSelector(state => state.auth)
  useEffect(() => {
    axios.get('/api/v1/user/getuser',
    {withCredentials: true})
      .then((res) => {
        dispatch(setUser(res.data.data))
        dispatch(setIsAuthorized(true))
      })
      .catch((error) => dispatch(setIsAuthorized(false)))
  },[isAuthorized])
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  )
}

export default App
