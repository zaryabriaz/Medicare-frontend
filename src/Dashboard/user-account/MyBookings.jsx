import { useFetchData } from "../../hooks/useFetchData"
import { BASE_URL } from "../../config"
import DoctorCard from "../../components/Doctors/DoctorCard"
import Loading from "../../components/Loader/Loading"
import Error from "../../components/Error/Error"
import { formateDate } from "../../utils/formateDate"

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`)

  console.log('Appointments Data:', appointments)
  console.log('Loading:', loading)
  console.log('Error:', error)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error errMessage={error} />
  }

  if (!appointments || appointments.length === 0) {
    return (
      <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
        You did not book any doctor yet!
      </h2>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {appointments.map((appointment) => {
        console.log('Individual Appointment:', appointment)
        return (
          <div key={appointment._id} className="bg-white p-4 rounded-lg shadow-md">
            <DoctorCard doctor={appointment} />
            <div className="mt-4 space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Appointment Date:</span> {formateDate(appointment.appointmentDate)}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Status:</span>{" "}
                <span className={`px-2 py-1 rounded-full text-sm ${
                  appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {appointment.status}
                </span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Payment Status:</span>{" "}
                <span className={`px-2 py-1 rounded-full text-sm ${
                  appointment.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {appointment.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyBookings
