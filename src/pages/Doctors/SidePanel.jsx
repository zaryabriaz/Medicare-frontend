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
            console.log('BASE_URL:', BASE_URL)

            // Ensure the URL is correct
            const apiUrl = `${BASE_URL}/bookings/checkout-session/${doctorId}`
            console.log('Making request to:', apiUrl)

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })

            // Log the raw response for debugging
            const responseText = await res.text()
            console.log('Raw response:', responseText)

            let data
            try {
                data = JSON.parse(responseText)
            } catch (parseError) {
                console.error('Failed to parse response as JSON:', parseError)
                throw new Error('Invalid response from server')
            }

            console.log('Full booking response:', data)

            if (!res.ok) {
                console.error('Server error response:', {
                    status: res.status,
                    statusText: res.statusText,
                    data: data
                })
                throw new Error(data.message || data.error || 'Failed to create checkout session')
            }

            if (!data.session?.url) {
                console.error('No session URL in response:', data)
                throw new Error('No checkout URL received from server')
            }

            console.log('Redirecting to checkout URL:', data.session.url)
            window.location.href = data.session.url

        } catch (err) {
            console.error('Detailed booking error:', {
                message: err.message,
                stack: err.stack,
                name: err.name
            })
            toast.error(err.message || 'Failed to book appointment. Please try again later.')
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