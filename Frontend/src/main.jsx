import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Home from './components/Home/Home.jsx'
import Jobs from './components/Job/Jobs.jsx'
import JobDetails from './components/Job/JobDetails.jsx'
import MyJobs from './components/Job/MyJobs.jsx'
import PostJob from './components/Job/PostJob.jsx'
import Application from './components/Application/Application.jsx'
import MyApplication from './components/Application/MyApplication.jsx'
import NotFound from './components/NotFound/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/job/getall',
        element: <Jobs />
      },
      {
        path: '/job/:id',
        element: <JobDetails />
      },
      {
        path: '/job/me',
        element: <MyJobs />
      },
      {
        path: '/job/post',
        element: <PostJob />
      },
      {
        path: '/application/:id',
        element: <Application />
      },
      {
        path: 'applications/me',
        element: <MyApplication />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
