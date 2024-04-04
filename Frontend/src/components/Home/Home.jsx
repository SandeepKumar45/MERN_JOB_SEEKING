import React from 'react'
import HeroSection from './HeroSection'
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function Home() {
  const { isAuthorized } = useSelector(state => state.auth)
  if (!isAuthorized) {
    return <Navigate to={"login"}/>
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  )
}

export default Home