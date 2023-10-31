import * as React from 'react'

import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Text
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { TextInput as PaperTextInput } from 'react-native-paper'

export default function ProductFilter({ isVisible, setIsVisible, f, setF }) {
  const resetFilter = {
    calories__gte: '',
    calories__lte: '',
    carbohydrates__gte: '',
    carbohydrates__lte: '',
    fats__gte: '',
    fats__lte: '',
    squirrels__gte: '',
    squirrels__lte: ''
  }
  const [filters, setFilters] = React.useState(resetFilter)
  console.log(filters)

  const resetFilters = () => {
    setFilters(resetFilter)
    setF({})
  }

  const pressed = () => {
    console.log(filters)
    const toSet = {}
    for (const key in filters) {
      if (filters[key] != '') {
        toSet[key] = filters[key]
      }
    }
    setF(toSet)
    setIsVisible(false)
  }
  return (
    <Modal visible={isVisible}>
      <ScrollView>
        <SafeAreaView style={modalStyles.container}>
          <View style={modalStyles.headContainer}>
            <AntDesign
              style={modalStyles.headClose}
              name='close'
              size={24}
              color='grey'
              onPress={() => setIsVisible(false)}
            />
            <Text style={modalStyles.headTitle}>Фильтры</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={modalStyles.headButton}>Сбросить</Text>
            </TouchableOpacity>
          </View>
          <View style={modalStyles.contentContainer}>
            <View style={[modalStyles.filterSet]}>
              <Text style={[modalStyles.filterSetTitle]}>Калорий:</Text>
              <PaperTextInput
                style={modalStyles.contentInput}
                mode='flat'
                backgroundColor='white'
                label={'от'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.calories__gte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    calories__gte: text
                  })
                  console.log(filters)
                }}
              />
              <PaperTextInput
                style={[modalStyles.contentInput, modalStyles.marginTop15]}
                mode='flat'
                backgroundColor='white'
                label={'до'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.calories__lte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    calories__lte: text
                  })
                  console.log(filters)
                }}
              />
            </View>
            <View style={[modalStyles.filterSet]}>
              <Text style={[modalStyles.filterSetTitle]}>Жиров:</Text>
              <PaperTextInput
                style={modalStyles.contentInput}
                mode='flat'
                backgroundColor='white'
                label={'от'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.fats__gte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    fats__gte: text
                  })
                  console.log(filters)
                }}
              />
              <PaperTextInput
                style={[modalStyles.contentInput, modalStyles.marginTop15]}
                mode='flat'
                backgroundColor='white'
                label={'до'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.fats__lte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    fats__lte: text
                  })
                  console.log(filters)
                }}
              />
            </View>
            <View style={[modalStyles.filterSet]}>
              <Text style={[modalStyles.filterSetTitle]}>Белков:</Text>
              <PaperTextInput
                style={modalStyles.contentInput}
                mode='flat'
                backgroundColor='white'
                label={'от'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.squirrels__gte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    squirrels__gte: text
                  })
                  console.log(filters)
                }}
              />
              <PaperTextInput
                style={[modalStyles.contentInput, modalStyles.marginTop15]}
                mode='flat'
                backgroundColor='white'
                label={'до'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.squirrels__lte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    squirrels__lte: text
                  })
                  console.log(filters)
                }}
              />
            </View>
            <View style={[modalStyles.filterSet]}>
              <Text style={[modalStyles.filterSetTitle]}>Углеводов:</Text>
              <PaperTextInput
                style={modalStyles.contentInput}
                mode='flat'
                backgroundColor='white'
                label={'от'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.carbohydrates__gte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    carbohydrates__gte: text
                  })
                  console.log(filters)
                }}
              />
              <PaperTextInput
                style={[modalStyles.contentInput, modalStyles.marginTop15]}
                mode='flat'
                backgroundColor='white'
                label={'до'}
                underlineColor='grey'
                activeUnderlineColor='#749063'
                contentStyle={{ backgroundColor: 'white' }}
                keyboardType='phone-pad'
                value={filters.carbohydrates__lte}
                onChangeText={text => {
                  setFilters({
                    ...filters,
                    carbohydrates__lte: text
                  })
                  console.log(filters)
                }}
              />
            </View>
          </View>
          <View style={modalStyles.actionContainer}>
            <Button
              // style={modalStyles.actionButton}
              title='Применить'
              borderRadius={15}
              color='#749063'
              fontFamily='mt-medium'
              onPress={pressed}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  )
}
const modalStyles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center'
  },
  loadingConainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    margin: 20,
    flexDirection: 'column',
    flex: 1
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headTitle: {
    fontFamily: 'mt-semibold',
    fontSize: 15,
    flex: 1
  },
  headButton: {
    flex: 1,
    color: '#749063',
    fontFamily: 'mt-medium',
    fontSize: 15
  },
  headClose: {
    flex: 1
  },

  actionContainer: {
    justifyContent: 'flex-end'
  },
  actionButton: {
    // backgroundColor: "#1111",
    // color: "#007AFF"
  },
  contentContainer: {
    flex: 1,
    marginTop: 35,
    fontSize: 15
  },
  contentInput: {
    // height: 40,
    fontFamily: 'mt-semibold',
    fontSize: 15
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
    // marginTop: 15,
  },
  marginTop15: {
    // marginTop: 15
  },
  filterSet: {
    marginTop: 20
  },
  filterSetTitle: {
    fontFamily: 'mt-semibold',
    fontSize: 15
  }
})
