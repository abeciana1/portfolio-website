import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process?.env?.NEXT_PUBLIC_PAYLOAD_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${process.env.AUTH_KEY}`,
  }
})

export default axiosInstance