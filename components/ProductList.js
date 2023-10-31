import * as React from 'react'

import { View, FlatList, StyleSheet, Scroll } from 'react-native'
import ProductItem from './ProductItem'


export default function ProductList({ data, loadProduct, fetchNextPage, hasNextPage }) {
  const loadMore = () => {
    console.log(hasNextPage)
    if (hasNextPage) {
      fetchNextPage();
    }
  };
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
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    width: '100%',
    margin: 'auto'
  }
})
