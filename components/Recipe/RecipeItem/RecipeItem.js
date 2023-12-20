import React, { useRef, useState } from 'react'
import styles from './RecipeItem.style'
import {
  Animated,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native'
import { MEDIA_API_URL } from '../../../constants/api'
import { DIFFICULTY } from '../../../constants/recipe'
import Pagination from '../../Pagination/Pagination'

function RecipeGalleryItem({ item, size, onPressHandler }) {
  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <Image
        source={{ uri: `${MEDIA_API_URL}${item.photo}` }}
        style={{
          flex: 1,
          width: size.width,
          aspectRatio: 16 / 9,
          borderRadius: 8
        }}
      />
    </TouchableWithoutFeedback>
  )
}

export default function RecipeItem({ loadRecipe, data }) {
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 })
  const scrollX = useRef(new Animated.Value(0)).current

  const cardOnPress = () => {
    console.log(data)
    loadRecipe(data)
  }
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
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current

  return (
    <SafeAreaView style={styles.card}>
      <View
        style={{ width: '100%', aspectRatio: 16 / 9, ...styles.card_image }}
        onLayout={onCardLayout}
      >
        {data.gallery?.length > 0 ? (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={data.gallery}
              renderItem={({ item }) => (
                <RecipeGalleryItem
                  item={item}
                  size={cardSize}
                  onPressHandler={cardOnPress}
                ></RecipeGalleryItem>
              )}
              snapToAlignment='center'
              onScroll={handleOnScroll}
              viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={data.gallery} scrollX={scrollX} width={cardSize.width} />
          </View>
        ) : (
          <TouchableWithoutFeedback onPress={cardOnPress}>
            <Image
              defaultSource={require('../../../assets/icon.png')}
              style={{
                width: '100%', // Устанавливаем ширину изображения на половину контейнера
                height: '100%', // Устанавливаем ширину изображения на половину контейнера
                borderRadius: 8
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={styles.card}>
        <TouchableOpacity onPress={cardOnPress} style={{}}>
          <View style={styles.card_content}>
            <View style={styles.card_title}>
              <Text style={styles.card_title_text}>{data.title}</Text>
            </View>
            <View style={styles.card_description}>
              <View style={styles.card_description_col}>
                <View style={styles.card_description_row}>
                  <View style={styles.card_description_col}>
                    <View>
                      <Text>Кухня:</Text>
                    </View>
                    <View>
                      <Text>Сложность:</Text>
                    </View>
                    <View>
                      <Text>Время:</Text>
                    </View>
                  </View>
                  <View style={styles.card_description_col}>
                    <View>
                      <Text>{data.kitchen}</Text>
                    </View>
                    <View>
                      <Text>{DIFFICULTY[data.difficulty_level]}</Text>
                    </View>
                    <View>
                      <Text>{data.cooking_time} мин.</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.card_description_col, { marginLeft: 10 }]}>
                <View style={styles.card_description_row}>
                  <View style={styles.card_description_col}>
                    <View>
                      <Text>Калории:</Text>
                    </View>
                    <View>
                      <Text>Жиры:</Text>
                    </View>
                    <View>
                      <Text>Белки:</Text>
                    </View>
                    <View>
                      <Text>Углеводы:</Text>
                    </View>
                  </View>
                  <View style={styles.card_description_col}>
                    <View>
                      <Text>{data.calories}</Text>
                    </View>
                    <View>
                      <Text>{data.fats}</Text>
                    </View>
                    <View>
                      <Text>{data.squirrels}</Text>
                    </View>
                    <View>
                      <Text>{data.carbohydrates}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
