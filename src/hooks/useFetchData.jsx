import { useEffect, useState } from 'react'
import { getAuthHeader } from '../config'

export const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            
            if (!url) {
                setLoading(false)
                return
            }

            try {
                console.log('Fetching from URL:', url)
                const token = localStorage.getItem('token')
                console.log('Token:', token ? 'Present' : 'Missing')

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
                console.log('Request headers:', headers)

                const res = await fetch(url, { 
                    method: 'GET',
                    headers,
                    credentials: 'include'
                })
                console.log('Response status:', res.status)

                const result = await res.json()
                console.log('Response data:', result)

                if (!res.ok) {
                    throw new Error(result.message || 'Request failed')
                }

                if (!result.data) {
                    console.warn('No data field in response:', result)
                    setData([])
                    return
                }

                setData(result.data)
            } catch (err) {
                console.error('Fetch error:', err)
                setError(err.message)
                setData([])
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { data, loading, error }
}
