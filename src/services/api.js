import axios from 'axios'

// https://api.hgbrasil.com/weather?key=2152c77f&lat=-23.682&lon=-46.875&user_ip=remote

export const key = '8909095f'

const api = axios.create({
  baseURL: 'https://api.hgbrasil.com'
})


export default api