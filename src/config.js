// Determine if we're in development or production
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// In production, use the full URL, in development use the proxy path
export const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api/v1'
  : 'https://medicare-backend-production-0b0c.up.railway.app/api/v1'

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
