import { axiosClassic } from '../http'

class RecipeStepService {
  URL_PATH = '/recipe-step'

  async getAll(params) {
    const response = await axiosClassic.get(this.URL_PATH, { params })
    return response.data
  }
}

export default new RecipeStepService()
