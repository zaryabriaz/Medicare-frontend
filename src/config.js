// Always use the full backend URL in production
const BACKEND_URL = 'https://medicare-backend-production-0b0c.up.railway.app'

// In development, use the proxy path, in production use the full URL
export const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api/v1'
  : `${BACKEND_URL}/api/v1`

// Debug logs
console.log('Current hostname:', window.location.hostname)
console.log('Using BASE_URL:', BASE_URL)
console.log('Full backend URL:', BACKEND_URL)

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    return token
}

export const getAuthHeader = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}
