
import { axiosClassic } from "../http"


class ProductService{
    URL_PATH = "/product"

    async getAll(params){
        const response = await axiosClassic.get(this.URL_PATH, {params})
        return response.data
    }

    async getById(id){
        return axiosClassic.get(`${this.URL_PATH}/${id}`)
    }
}

export default new ProductService()
