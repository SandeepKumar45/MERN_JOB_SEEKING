import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'


function Jobs() {
  const [jobs, setJob] = useState([])
  const { isAuthorized } = useSelector(state => state.auth)
  useEffect(() => {
    axios.get('/api/v1/job/getall',{
      withCredentials: true
    }).then((res) => {
      setJob(res.data)
    }).catch((err) => {
      console.log(err);
    })
  },[])

  if (!isAuthorized) {
    return <Navigate to={'/login'}/>
  }
  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.data &&
            jobs.data.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  )
}

export default Jobs