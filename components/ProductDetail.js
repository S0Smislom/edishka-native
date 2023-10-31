import * as React from 'react'
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useGetProduct } from '../hooks/product/useGetProduct'

export default function ProductDetail({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => {
      return (
        <TouchableOpacity>
          <Entypo name='dots-three-horizontal' size={24} color='white' />
        </TouchableOpacity>
      )
    }
  })

  const {data, isLoading} = useGetProduct(route.params.data.id)

  if (isLoading){
    return (
      <Text>Loading</Text>
    )
  }else {

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.containerHead, styles.card]}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/icon.png')} // Замените на путь к вашему изображению
            style={styles.image}
          />
          {/* <Text>left</Text> */}
        </View>
        <View style={styles.textContainer}>
          {/* <Text>Ваш текст здесь</Text> */}
          <Text style={styles.headTitle}>Состав:</Text>
          <ProductStructure title='ккал' value={data.calories} />
          <ProductStructure title='жиры' value={data.fats} />
          <ProductStructure title='белки' value={data.squirrels} />
          <ProductStructure title='углеводы' value={data.carbohydrates} />
        </View>
      </View>
      {
      data?.description ?
      <View style={[styles.card, styles.description]}>
        <Text style={styles.descriptionTitle}>Описание:</Text>
        <Text style={styles.descriptionText}>
          {data.description}
        </Text>
      </View>
      :
        null
      }

    </SafeAreaView>
  )
}
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    maxWidth: 900,
    marginHorizontal: 'auto'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '2%'
  },
  containerHead: {
    flexDirection: 'row', // Располагаем элементы в ряд
    marginTop: 50
  },
  description: {
    marginTop: 10
  },
  descriptionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'mt-semibold'
  },
  descriptionText: {
    fontSize: 15,
    fontFamily: 'mt-medium',
    textAlign: 'justify'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center', // Выравниваем изображение по центру вертикально
    alignItems: 'center', // Выравниваем изображение по центру горизонтально
    backgroundColor: 'grey',
    aspectRatio: 1, // Поддерживаем соотношение сторон изображения
    maxHeight: 200,
    maxWidth: 200,
    // margin: "auto",
    borderRadius: 8,

    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  image: {
    width: '100%', // Устанавливаем ширину изображения на половину контейнера
    height: '100%', // Устанавливаем ширину изображения на половину контейнера
    borderRadius: 8
  },
  textContainer: {
    flex: 1, // Занимает половину ширины экрана
    textAlign: 'center',
    paddingHorizontal: 16 // Добавляем отступы по бокам
  },
  headTitle: {
    textAlign: 'center',
    fontFamily: 'mt-semibold',
    fontWeight: 'bold',
    fontSize: 15
  }
})

function ProductStructure({ title, value }) {
  return (
    <View style={pStyles.container}>
      <Text style={[pStyles.textCenter, pStyles.textValue]}>{value}</Text>
      <Text style={[pStyles.textCenter, pStyles.textTitle]}>{title}</Text>
    </View>
  )
}

const pStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginTop: 10
  },
  textCenter: {
    textAlign: 'center'
  },
  textValue: {
    fontFamily: 'mt-semibold',
    fontSize: 15
  },
  textTitle: {
    fontFamily: 'mt-semibold',
    fontSize: 12
  }
})
