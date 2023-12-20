import * as React from 'react'

import { View, FlatList, StyleSheet, Text } from 'react-native'
import RecipeItem from '../RecipeItem/RecipeItem'
// import ProductItem from './ProductItem'

export default function RecipeList({ data, loadRecipe, fetchNextPage, hasNextPage }) {
  const loadMore = () => {
    console.log(hasNextPage)
    if (hasNextPage === true) {
      fetchNextPage()
    }
  }
  if (data?.length > 0) {
    return (
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        data={data}
        renderItem={({ item }) => <RecipeItem loadRecipe={loadRecipe} data={item} />}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.textNotFound}>Ничего не найдено...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    width: '100%',
    height: '100%',
    margin: 'auto'
    // alignItems:'center'
  },
  textNotFound: {
    alignItems: 'center',
    textAlign: 'center'
  }
})
