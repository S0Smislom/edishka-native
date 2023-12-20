import { View, Text, SafeAreaView, Image, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useGetRecipeSteps } from '../../../hooks/recipeStep/useGetRecipeSteps'
import { MEDIA_API_URL } from '../../../constants/api'

export default function RecipeDetailSteps({}) {
  const route = useRoute()
  const { recipe } = route.params

  const { data, hasNextPage, fetchNextPage, isLoading } = useGetRecipeSteps({
    recipe_id: recipe.id
  })
  const steps = data?.pages.map(page => page.data).flat()
  const loadMore = () => {
    if (hasNextPage === true) {
      fetchNextPage()
    }
  }

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {!isLoading ? (
        <View style={{ height: '100%' }}>
          {steps ? (
            <FlatList
              scrollEnabled
              data={steps}
              keyExtractor={item => item.id}
              onEndReached={loadMore}
              onEndReachedThreshold={0.3}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    marginTop: 10,
                    padding: 10
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: 'mt-semibold',
                        fontWeight: 'bold',
                        fontSize: 20
                      }}
                    >
                      Шаг {index + 1}
                    </Text>
                  </View>
                  {item.photo && (
                    <View
                      style={{
                        marginTop: 10
                      }}
                    >
                      <Image
                        source={{ uri: `${MEDIA_API_URL}${item.photo}` }}
                        defaultSource={require('../../../assets/icon.png')}
                        style={{
                          flex: 1,
                          // width: size.width,
                          aspectRatio: 16 / 9,
                          borderRadius: 8
                        }}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      marginTop: 10
                      // width: '100%'
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'mt-semibold',
                        fontWeight: 'light',
                        fontSize: 15,
                        textAlign: 'justify'
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text>Ничего не найдено...</Text>
          )}
        </View>
      ) : (
        <Text>loading</Text>
      )}
    </SafeAreaView>
  )
}
