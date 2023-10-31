import * as React from 'react'

import { View, FlatList, StyleSheet, Text, Scroll } from 'react-native'
import ProductItem from './ProductItem'

export default function ProductList({ data, loadProduct, fetchNextPage, hasNextPage }) {
  const loadMore = () => {
    console.log(hasNextPage)
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  if (data.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <ProductItem loadProduct={loadProduct} data={item} />}
          keyExtractor={item => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      </View>
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
    margin: 'auto'
    // alignItems:'center'
  },
  textNotFound: {
    alignItems: 'center',
    textAlign: 'center'
  }
})
