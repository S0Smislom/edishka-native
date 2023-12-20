import * as React from 'react'

import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { MEDIA_API_URL } from '../../../constants/api'
import { FontAwesome } from '@expo/vector-icons'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'

export default function ProductItem({ loadProduct, data }) {
  const cardOnPress = () => {
    console.log(data)
    loadProduct(data)
  }

  return (
    <TouchableOpacity onPress={cardOnPress} style={styles.card}>
      <View style={styles.greyBox}>
        <Image style={styles.image} source={{ uri: `${MEDIA_API_URL}${data.photo}` }} />
      </View>
      <Text style={styles.text}>{data.title}</Text>
      <Menu>
        <MenuTrigger>
          <FontAwesome name='reorder' size={24} color='grey' />
        </MenuTrigger>
        <MenuOptions customStyles={menuStyles}>
          <MenuOption onSelect={() => alert(`Save ${data.id}`)} text='Save' />
          <MenuOption onSelect={() => alert(`Delete`)} text='Delete' />
        </MenuOptions>
      </Menu>
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
    width: '90%',
    padding: 10,
    height: 70,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
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

const menuStyles = {
  // optionsContainer:{
  //   width: 100,
  //   alignItems: "center",
  //   marginLeft: -200,
  // },
  optionWrapper: {
    // backgroundColor: "green",
    padding: 5,
    textAlign: 'center'
    // width:100
  }
  // optionText: styles.text
}
