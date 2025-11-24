import React from 'react'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className='bg-gradient-to-r from-[#FFB66B] via-[#F06A6A] to-[#F06A6A] py-16 lg:py-20'>
      <div className='max-w-4xl mx-auto px-4 text-center text-white'>
        <div className='grid gap-6'>
          <h1 className='lg:text-4xl text-3xl font-bold leading-tight'>
            Ready to Start Your Language Journey?
          </h1>
          <p className='text-lg lg:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed'>
            Join thousands of learners mastering new languages every day. Get started for free today!
          </p>
          <div className='mt-6'>
            <Link 
              to="/signup"
              className="inline-flex bg-white text-[#8F2D56] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Learning Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}