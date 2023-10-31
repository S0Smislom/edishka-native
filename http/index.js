import axios from 'axios'
import { API_URL } from '../constants/api'

export const axiosClassic = axios.create({
  baseURL: API_URL,
  // baseURL: "http://trenera-api.kra"
  headers: {
    'Content-Type': 'application/json'
  }
})
