import React from 'react'
import Hero from '../components/Hero'
import ImageUpload from '../components/Services'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='home-section'>
        <Hero />
        <ImageUpload />
        <Footer />
    </div>
  )
}

export default Home
