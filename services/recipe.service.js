import { axiosClassic } from '../http'

class RecipeService {
  URL_PATH = '/recipe'

  async getAll(params) {
    const response = await axiosClassic.get(this.URL_PATH, { params })
    return response.data || { data: [], total: 0, limit: params.limit, offset: params.offset }
  }

  async getById(id) {
    return axiosClassic.get(`${this.URL_PATH}/${id}`) || {}
  }
}

export default new RecipeService()
