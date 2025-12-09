import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


function Home() {
  return (
    <div className='home-section'>
        <Navbar />
        <Hero />
        <Services />
        <Footer />
    </div>
  )
}

export default Home
