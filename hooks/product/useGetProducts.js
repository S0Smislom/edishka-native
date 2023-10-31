import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import productService from '../../services/product.service'
import { LIMIT } from '../../constants/api'

export const useGetProducts = params => {
  return useQuery(['product', params.offset], () => productService.getAll(params), {
    select: ({ data }) => data
  })
}

export const useGetProductsInfinite = params => {
  return useInfiniteQuery(
    ['products', params],
    ({ pageParam = 0 }) => productService.getAll({ limit: LIMIT, offset: pageParam, ...params }),
    {
      getNextPageParam: lastPage => {
        if (lastPage.offset + LIMIT > lastPage.total) {
          return undefined
        }
        return lastPage.offset + LIMIT
      }
    }
  )
}
