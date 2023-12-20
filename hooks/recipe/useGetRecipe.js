import { useQuery } from '@tanstack/react-query'
import recipeService from '../../services/recipe.service'

export const useGetRecipe = id => {
  return useQuery(['recipe', id], () => recipeService.getById(id), {
    select: ({ data }) => data
  })
}
