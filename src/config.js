// Determine if we're in development or production
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Set the base URL based on the environment
export const BASE_URL = isDevelopment 
  ? '/api/v1'  // In development, use the proxy path
  : 'https://medicare-backend-production-0b0c.up.railway.app/api/v1'  // In production, use the full URL

// Debug logs
console.log('Current hostname:', window.location.hostname)
console.log('Is development:', isDevelopment)
console.log('Using BASE_URL:', BASE_URL)

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    return token
}

export const getAuthHeader = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}
