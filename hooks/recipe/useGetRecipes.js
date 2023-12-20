import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { LIMIT } from '../../constants/api'
import recipeService from '../../services/recipe.service'

export const useGetRecipes = params => {
  return useInfiniteQuery(
    ['recipes', params],
    ({ pageParam = 0 }) => recipeService.getAll({ limit: LIMIT, offset: pageParam, ...params }),
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
