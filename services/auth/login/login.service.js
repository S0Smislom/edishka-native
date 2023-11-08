import { axiosClassic } from '../../../http'

class AuthService {
  URL_PATH = '/login'

  async login(phone) {
    return await axiosClassic.post(this.URL_PATH, { phone })
  }
  async confirm(id, code) {
    return await axiosClassic.post(`${this.URL_PATH}/confirm`, { id, code })
  }
}

export default new AuthService()
