import { useRoute } from '@react-navigation/native'
import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  FlatList,
  ScrollView
} from 'react-native'
import Pagination from '../../Pagination/Pagination'
import { MEDIA_API_URL } from '../../../constants/api'
import { DIFFICULTY } from '../../../constants/recipe'

function RecipeGalleryItem({ item, size }) {
  return (
    <Image
      source={{ uri: `${MEDIA_API_URL}${item.photo}` }}
      style={{
        flex: 1,
        width: size.width,
        aspectRatio: 16 / 9,
        borderRadius: 8
      }}
    />
  )
}

export default function RecipeDetailDescription({}) {
  const route = useRoute()
  const { recipe } = route.params

  const [cardSize, setCardSize] = React.useState({ width: 0, height: 0 })
  const scrollX = React.useRef(new Animated.Value(0)).current
  const onCardLayout = event => {
    const { width } = event.nativeEvent.layout
    const h = Math.round((9 / 16) * width)
    setCardSize({ width, h })
  }
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX
            }
          }
        }
      ],
      {
        useNativeDriver: false
      }
    )(event)
  }
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50
  }).current
  return (
    <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
      <View
        style={{ width: '100%', aspectRatio: 16 / 9, ...styles.card_image }}
        onLayout={onCardLayout}
      >
        {recipe.gallery?.length > 0 ? (
          <View style={{ width: '100%' }}>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={recipe.gallery}
              renderItem={({ item }) => (
                <RecipeGalleryItem
                  item={item}
                  size={cardSize}
                  // onPressHandler={cardOnPress}
                ></RecipeGalleryItem>
              )}
              snapToAlignment='center'
              onScroll={handleOnScroll}
              viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={recipe.gallery} scrollX={scrollX} width={cardSize.width} />
          </View>
        ) : (
          <Image
            defaultSource={require('../../../assets/icon.png')}
            style={{
              width: '100%', // Устанавливаем ширину изображения на половину контейнера
              height: '100%', // Устанавливаем ширину изображения на половину контейнера
              borderRadius: 8
            }}
          />
        )}
      </View>
      <View style={[styles.card, { marginTop: 10, padding: 20 }]}>
        <View
          style={{
            ...styles.textContainer,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <RecipeStructure title='кухня' value={recipe.kitchen} />
          <RecipeStructure title='сложность' value={DIFFICULTY[recipe.difficulty_level]} />
          <RecipeStructure title='время' value={`${recipe.cooking_time} мин.`} />
        </View>
      </View>
      <View style={[styles.containerHead, styles.card, { justifyContent: 'center', padding: 20 }]}>
        <View
          style={{
            ...styles.textContainer,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <RecipeStructure title='ккал' value={recipe.calories} />
          <RecipeStructure title='жиры' value={recipe.fats} />
          <RecipeStructure title='белки' value={recipe.squirrels} />
          <RecipeStructure title='углеводы' value={recipe.carbohydrates} />
        </View>
      </View>

      <View style={[styles.card, styles.description, { padding: 20 }]}>
        <Text style={styles.descriptionTitle}>Описание:</Text>
        <Text style={styles.descriptionText}>{recipe.description}</Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8
    // padding: '2%'
  },
  containerHead: {
    // flexDirection: 'row', // Располагаем элементы в ряд
    marginTop: 10
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
    // flex: 1, // Занимает половину ширины экрана
    textAlign: 'center',
    paddingHorizontal: 16 // Добавляем отступы по бокам
  },
  headTitle: {
    textAlign: 'center',
    fontFamily: 'mt-semibold',
    fontWeight: 'bold',
    fontSize: 15
  },
  text: {
    fontFamily: 'mt-semibold',
    fontWeight: 'bold',
    fontSize: 15
  }
})

function RecipeStructure({ title, value }) {
  return (
    <View style={pStyles.container}>
      <Text style={[pStyles.textCenter, pStyles.textValue]}>{value}</Text>
      <Text style={[pStyles.textCenter, pStyles.textTitle]}>{title}</Text>
    </View>
  )
}

const pStyles = StyleSheet.create({
  container: {
    // borderBottomWidth: 1,
    // borderColor: 'grey',
    // marginTop: 10
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
