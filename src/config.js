// In development, use the proxy path, in production use the full URL
export const BASE_URL = import.meta.env.PROD 
  ? 'https://medicare-backend-production-0b0c.up.railway.app/api/v1'
  : '/api/v1'

// Add a debug log to verify the URL being used
console.log('Current BASE_URL:', BASE_URL)
console.log('Environment:', import.meta.env.PROD ? 'Production' : 'Development')

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    return token
}

export const getAuthHeader = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}
