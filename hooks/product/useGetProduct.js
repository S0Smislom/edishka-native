import { useQuery } from '@tanstack/react-query'
import productService from '../../services/product.service'

export const useGetProduct = (id) => {
	return useQuery(['product', id], () => productService.getById(id),
		{
			select: ({data}) => data
		}
	)
}