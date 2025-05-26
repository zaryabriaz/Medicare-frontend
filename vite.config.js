export const BASE_URL = 'https://medicare-backend-production-0b0c.up.railway.app/api/v1'

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    return token
}

export const getAuthHeader = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}