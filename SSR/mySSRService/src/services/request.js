import axios from 'axios'

const config = {}

if (typeof window === 'undefined') {
  config.baseURL = 'https://www.mocklib.com'
} else {
  // config.baseURL = ''
}

const request = axios.create(config)
export default request
