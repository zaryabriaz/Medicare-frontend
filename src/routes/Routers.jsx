import { Home } from '../pages/Home'
import { Doctors } from '../pages/Doctors/Doctors'
import { DoctorDetails } from '../pages/Doctors/DoctorDetails'
import { Contact } from '../pages/Contact'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Services } from '../pages/Services'

import { Routes, Route } from 'react-router-dom'

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/doctors" element={<Doctors />}/>
    <Route path="/doctors/:id" element={<DoctorDetails />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Signup />}/>
    <Route path="/contact" element={<Contact />}/>
    <Route path="/services" element={<Services />}/>
  </Routes>
}

export default Routers