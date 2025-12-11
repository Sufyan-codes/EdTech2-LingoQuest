import {useState} from 'react'
import logo from "../assets/Icons/logo.svg"
import { Ri24HoursFill, RiCloseLine, RiMenu3Fill } from '@remixicon/react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  
    const toggleMenu = () => {
    setIsOpen(!isOpen)
}
    
    return (
        <nav className="fixed top-0 bg-[#EFFAFB] border-[#7473DE] border-b left-0 right-0 z-50 m2">
            <div className="text-neutral-500
            max-w-7xl mx-auto px-4 py-3 flex justify-between items-center
            ">
                {/* Left Logo */}
                <a href="#"><img src={logo} alt="logo" width={120} height={24} /></a>

                {/* center Links */}
                <div className="hidden md:flex space-x-6 text-[#1A2634] font-medium">
                    <a href="#courses" className="hover:text-neutral-200">
                        Courses
                    </a>
                    <a href="#pricing" className="hover:text-neutral-200">
                        Leaderboard
                    </a>
                    <a href="#about" className="hover:text-neutral-200">
                        About
                    </a>
                    <a href="#contact" className="hover:text-neutral-200">
                        contact
                    </a>
                </div>

                {/* right btns */}
                <div className="hidden md:flex space-x-4 items-center">
                    
                    <Link to='/login' className="border border-[#2EA148] text-[#2EA148]
                    py-2 px-4 rounded-lg hover:bg-neutral-100 transition">
                        Login
                    </Link>
                    <Link to='/signup' className="bg-[#2EA148] text-white
                    py-2 px-4 rounded-lg hover:bg-[#8F2D56]-500 transition">
                        Start Learning
                    </Link>
                </div>

                {/* hamburger */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className='text-[#8F2D56] focus:outline-none'
                        aria-label={isOpen ? "Open Menu" : "Close Menu"}>
                    {isOpen ? <RiCloseLine /> : <RiMenu3Fill />}
                    </button>
                </div>

            </div>

            {/* nav menu */}
            {isOpen && 
                (
                <div className="md:hidden bg-[#EFF8F4] backdrop-blur-md 
                 p-4 rounded-xl mt-2">
                    <div className='flex flex-col space-y-4'>
                    <a href="#courses" className="hover:text-neutral-200">
                        Courses
                    </a>
                    <a href="#leaderboard" className="hover:text-neutral-200">
                        Leaderboard
                    </a>
                    <a href="#about" className="hover:text-neutral-200">
                        About
                    </a>
                    <a href="#contact" className="hover:text-neutral-200">
                        contact
                    </a>
                        <a href="#" className="border border-[#218380] text-[#218380]
                    py-2 px-4 rounded-lg hover:bg-neutral-700 transition">
                        Get a Demo
                    </a>
                    <a href="#" className="bg-[#http://localhost:5173/] text-[#8F2D56]
                    py-2 px-4 rounded-lg hover:bg-blue-500 transition">
                        Start Free Trial
                    </a>
                    </div>
                </div>
            )
            }
        </nav>
  )
}
