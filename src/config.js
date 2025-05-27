// Production backend URL
const API_URL = 'https://exciting-learning-production.up.railway.app'

// Base URL for all API requests
export const BASE_URL = `${API_URL}/api/v1`

// Debug logs
console.log('API URL:', API_URL)
console.log('BASE URL:', BASE_URL)

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    return token
}

export const getAuthHeader = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}
