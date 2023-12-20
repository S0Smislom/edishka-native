import * as React from 'react'
import { TextInput, StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useGetRecipes } from '../../../hooks/recipe/useGetRecipes'
import RecipeFilter from '../RecipeFilter/RecipeFilter'
import RecipeList from '../RecipeList/RecipeList'
import { useDefaultHeaderHeight } from '../../../hooks/useDefaultHeaderHeight'

export default function Recipe({ navigation }) {
  const [search, setSearch] = React.useState('')
  const [isVisible, setIsVisible] = React.useState(false)

  const headerHeight = useDefaultHeaderHeight()

  const [filters, setFilters] = React.useState({})

  const { data, hasNextPage, fetchNextPage, isLoading } = useGetRecipes({
    title: search,
    ...filters
  })

  const loadRecipe = data => {
    navigation.navigate('RecipeDetail', { data: data })
  }

  return (
    <View style={{ height: '100%' }}>
      <SafeAreaView style={[styles.header, { height: headerHeight, alignItems: 'center' }]}>
        <View style={{ ...styles.container }}>
          <View style={{ width: '100%' }}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setSearch(text)
              }}
              placeholder='Поиск'
              placeholderTextColor='grey'
              multiline={false}
              value={search}
            />
          </View>
          <TouchableOpacity style={styles.filter} onPress={() => setIsVisible(true)}>
            <FontAwesome name='sliders' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: '#F4F6FB', height: '100%' }}>
        <RecipeFilter
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          f={filters}
          setF={setFilters}
        />
        {isLoading ? (
          <View style={styles.loadingConainer}>
            <Text style={styles.loading}>Loading</Text>
          </View>
        ) : (
          <RecipeList
            data={data?.pages.map(page => page.data).flat()}
            loadRecipe={loadRecipe}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          ></RecipeList>
        )}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingConainer: {
    flex: 1,
    alignContent: 'center'
  },
  header: {
    backgroundColor: '#749063'
    // height: 64,
  },
  container: {
    // paddingTop: 50,
    justifyContent: 'center',
    // flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    // padding: 15,
    // padding: 'auto',
    margin: 'auto'
    // minWidth: 500
  },
  input: {
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    fontFamily: 'mt-semibold',
    backgroundColor: 'white',
    width: '100%'
  },
  filter: {
    // padding: 5
    paddingLeft: '2%',
    margin: 'auto'
  },
  filterIcon: {
    margin: 'auto'
  }
})
