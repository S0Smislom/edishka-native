import { useInfiniteQuery } from '@tanstack/react-query'
import recipeStepService from '../../services/recipeStep.service'

const LIMIT = 5
export const useGetRecipeSteps = params => {
  return useInfiniteQuery(
    ['recipeSteps', params],
    ({ pageParam = 0 }) => recipeStepService.getAll({ limit: LIMIT, offset: pageParam, ...params }),
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
