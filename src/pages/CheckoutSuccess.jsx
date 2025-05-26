import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const CheckoutSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Checkout Successful!
                </h1>
                
                <p className="text-gray-600 mb-8">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primaryColor text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-all"
                    >
                        Return to Home
                    </button>
                    
                    <button
                        onClick={() => navigate('/users/profile/me')}
                        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-all"
                    >
                        View My Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess; 