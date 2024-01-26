import axios from 'axios'
import { CAT_API_SERVICE_URL } from '../config'

const apiService = axios.create({
  baseURL: CAT_API_SERVICE_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_CAT_API_X_API_KEY,
  },
})

export default apiService
