useEffect(() => {
    console.log('Current URL:', window.location.href);
    console.log('Doctor ID from URL:', id);
    console.log('API URL being called:', `${BASE_URL}/doctors/${id}`);
}, [id]); 