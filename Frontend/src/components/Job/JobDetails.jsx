import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'

function JobDetails() {
  const [job, setJob] = useState({})
  const { id } = useParams()
  const { isAuthorized, user } = useSelector(state => state.auth)

  if (!isAuthorized) {
    return <Navigate to={'/login'} />
  }

  const getJob = async () => {
    try {
      const res = await axios.get(`https://mern-job-seeking-ngkz.onrender.com/api/v1/job/${id}`,{withCredentials: true})
      setJob(res.data.data)
    } catch (error) {
      return <Navigate to={'/notfound'}/>
    }
}
getJob()
  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <pre>{job.description}</pre>
          </p>
          <p>
            Job Posted On: <span>{job.createdAt}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default JobDetails