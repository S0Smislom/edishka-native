import * as React from 'react'

import { Text, SafeAreaView, FlatList, View, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { MEDIA_API_URL } from '../../../constants/api'

export default function RecipeDetailCompund({}) {
  const route = useRoute()
  const { recipe } = route.params

  return (
    <SafeAreaView
      style={{
        width: '100%',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <View
        style={{
          width: '90%',
          // flex: 1,
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '100%'
        }}
      >
        <FlatList
          scrollEnabled
          data={recipe.products}
          renderItem={({ item }) => (
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 10,
                marginTop: 10,

                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: 'grey'
                  }}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                    source={{ uri: `${MEDIA_API_URL}${item.photo}` }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'mt-semibold',
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingLeft: 15
                  }}
                >
                  {item.title} {item.amount} мг
                </Text>
              </View>
              <View>
                <AntDesign name='shoppingcart' size={24} color='black' />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
