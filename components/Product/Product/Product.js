import * as React from 'react'

import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Text,
  ScrollView
} from 'react-native'
import ProductList from '../ProductList/ProductList'
import { FontAwesome } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { useGetProductsInfinite } from '../../../hooks/product/useGetProducts'
import ProductFilter from '../ProductFilter/ProductFilter'
import { useDefaultHeaderHeight } from '../../../hooks/useDefaultHeaderHeight'

export default function Home({ navigation }) {
  // TODO add debaunse
  const [search, setSearch] = React.useState('')
  const [isVisible, setIsVisible] = React.useState(false)
  const height = useDefaultHeaderHeight()

  const [filters, setFilters] = React.useState({})

  const { data, hasNextPage, fetchNextPage, isLoading } = useGetProductsInfinite({
    title: search,
    ...filters
  })

  const loadProduct = data => {
    console.log('daat', data)
    navigation.navigate('ProductDetail', { data: data })
  }

  return (
    <View style={{ height: '100%' }}>
      <SafeAreaView style={[styles.header, { height: height, alignItems: 'center' }]}>
        <View style={styles.container}>
          <View style={{ width: '100%' }}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setSearch(text)
              }}
              placeholder='Поиск'
              placeholderTextColor='grey'
              // onSubmitEditing={searchRequest}
              value={search}
            />
          </View>
          <TouchableOpacity style={styles.filter} onPress={() => setIsVisible(true)}>
            <FontAwesome name='sliders' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: '#F4F6FB', height: '100%' }}>
        <ProductFilter
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
          <ProductList
            data={data?.pages.map(page => page.data).flat()}
            loadProduct={loadProduct}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          ></ProductList>
        )}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
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
