import * as React from 'react'

import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { MEDIA_API_URL } from '../constants/api'

export default function ProductItem({ loadProduct, data }) {
  const cardOnPress = () => {
    console.log(data)
    loadProduct(data)
  }

  return (
    <TouchableOpacity onPress={cardOnPress} style={styles.card}>
      {/* <Image
                    source={
                        {uri: 'https://reactnative.dev/img/tiny_logo.png',}
                    }
                /> */}
      <View style={styles.greyBox}>
        <Image style={styles.image} source={{ uri: `${MEDIA_API_URL}${data.photo}` }} />
      </View>
      <Text style={styles.text}>{data.title}</Text>
      <TouchableOpacity style={styles.filter}>
        <FontAwesome name='reorder' size={24} color='grey' />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  greyBox: {
    height: 50,
    width: 50,
    backgroundColor: 'grey'
  },
  image: {
    height: '100%',
    width: '100%'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: 70,
    marginTop: 10,
    margin: 'auto',
    paddingHorizontal: '5%',
    backgroundColor: '#FFF',
    // borderWidth: 1,
    borderRadius: 8
  },
  text: {
    fontSize: 16,
    fontFamily: 'mt-semibold'
  },
  filter: {
    paddingLeft: '2%'
  }
})
