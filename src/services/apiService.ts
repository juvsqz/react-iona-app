import axios from 'axios'

const BASE_URL = import.meta.env.VITE_CAT_API_SERVICE_URL || 'https://api.thecatapi.com/v1'

console.log('wew', import.meta);

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_CAT_API_X_API_KEY,
  },
  // You can add headers, authentication tokens, etc., here
})

export default apiService
