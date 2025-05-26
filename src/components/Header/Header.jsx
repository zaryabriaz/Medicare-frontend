import React, { useState } from 'react'
import { useEffect, useRef, useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import defaultAvatar from "../../assets/images/doctor-img01.png"
import { BiMenu } from 'react-icons/bi';
import { FaUser, FaVideo, FaUserMd } from 'react-icons/fa';
import { authContext } from '../../context/authContext'

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  }
]

export const Header = () => {
  const headerRef = useRef(null)
  const MenuRef = useRef(null)
  const {user, role, token} = useContext(authContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Header - User object:', user)
    console.log('Header - User photo:', user?.photo)
  }, [user])

  const handleStickyHeader = () => {
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader()
    return () => window.removeEventListener('scroll', handleStickyHeader)
  })

  const toggleMenu = ()=> MenuRef.current.classList.toggle('show__menu')
 
  const handleProfileClick = () => {
    setShowDropdown(false)
    navigate(role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me')
  }

  const handleConsultationClick = () => {
    setShowDropdown(false)
    navigate('/doctors')
  }

  const renderUserAvatar = () => {
    if (!user?.photo) {
      return role === 'doctor' ? (
        <div className="w-full h-full flex items-center justify-center bg-primaryColor bg-opacity-10 rounded-full">
          <FaUserMd className="w-5 h-5 text-primaryColor" />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primaryColor bg-opacity-10 rounded-full">
          <FaUser className="w-5 h-5 text-primaryColor" />
        </div>
      );
    }
    return (
      <img 
        src={user.photo} 
        className="w-full h-full object-cover rounded-full" 
        alt="User Avatar"
        onError={(e) => {
          e.target.onerror = null;
          e.target.parentElement.innerHTML = role === 'doctor' ? 
            '<div class="w-full h-full flex items-center justify-center bg-primaryColor bg-opacity-10 rounded-full"><svg class="w-5 h-5 text-primaryColor" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></div>' :
            '<div class="w-full h-full flex items-center justify-center bg-primaryColor bg-opacity-10 rounded-full"><svg class="w-5 h-5 text-primaryColor" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></div>';
        }}
      />
    );
  };

  return <header className="header flex items-center" ref={headerRef}>
    <div className='container'>
      <div className="flex items-center justify-between">
       {/* logo */}
        <div>
          <img src={logo} alt="" />
        </div>

        {/* menu */}
        <div className='navigation' ref={MenuRef} onClick={toggleMenu}>
          <ul className='menu flex items-center gap-[2.7rem]'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={navClass =>
                    navClass.isActive
                    ? " text-primaryColor text-[16px] leading-7 font-[600]"
                    : "text-textColor text-[16px] leading-7 front-[500] hover:text-primaryColor"  
                  }
                >
                  {link.display}
                </NavLink>  
              </li>
            ))}
          </ul>
        </div>

        {/* nav right */}
        <div className='flex items-center gap-4'>
        {token && user ? (
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <figure className="w-[35px] h-[35px] rounded-full cursor-pointer border-2 border-solid border-primaryColor overflow-hidden">
                {renderUserAvatar()}
              </figure>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaUser className="text-primaryColor" />
                  View Profile
                </button>
                {role === 'doctor' && (
                  <button
                    onClick={handleConsultationClick}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaVideo className="text-primaryColor" />
                    Start Consultation
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
              Login
            </button>
          </Link>
        )}
        </div>

        <span className='md:hidden' onClick={toggleMenu}>
          <BiMenu className='w-6 h-6 cursor-pointer'>
          </BiMenu>
        </span>
      </div>
    </div>
  </header>
}
