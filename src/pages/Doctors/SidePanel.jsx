import React, { useContext } from 'react'
import convertTime from '../../utils/convertTime'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../config'
import { authContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
    const { token, user } = useContext(authContext)
    const navigate = useNavigate()

    const bookingHandler = async() => {
        try {
            if (!token) {
                toast.error('Please login to book an appointment')
                navigate('/login')
                return
            }

            if (!user) {
                toast.error('User session expired. Please login again')
                navigate('/login')
                return
            }

            console.log('Starting booking process for doctor:', doctorId)
            console.log('User token:', token ? 'Present' : 'Missing')

            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })

            const data = await res.json()
            console.log('Booking response:', data)

            if (!res.ok) {
                throw new Error(data.message || 'Please try again')
            }

            if (data.session?.url) {
                window.location.href = data.session.url
            } else {
                throw new Error('No checkout URL received')
            }

        } catch (err) {
            console.error('Booking error:', err)
            toast.error(err.message || 'Failed to book appointment')
        }
    }

    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
            <div className='flex items-center justify-between'>
                <p className='text__para mt-0 font-semibold'>Ticket Price</p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                    {ticketPrice} BDT
                </span>
            </div>

            <div className='mt-[30px]'>
                <p className='text__para mt-0 font-semibold text-headingColor'>
                    Available Time slots:
                </p>

                <ul className='mt-3'>
                    {timeSlots?.map((item, index) => (
                        <li key={index} className='flex items-center justify-between mb-2'>
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                            </p>
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <button 
                onClick={bookingHandler} 
                className='btn px-2 w-full rounded-md'
            >
                Book Appointment
            </button>
        </div>
    )
}

export default SidePanel