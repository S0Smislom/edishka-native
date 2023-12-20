import * as React from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { MEDIA_API_URL } from '../../../constants/api'
import { useGetRecipe } from '../../../hooks/recipe/useGetRecipe'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RecipeDetailDescription from './RecipeDetailDescription'
import RecipeDetailSteps from './RecipeDetailSteps'
import RecipeDetailCompund from './RecipeDetailCompund'

const Tab = createMaterialTopTabNavigator()

export default function RecipeDetail({ navigation, route }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity>
            <Entypo name='dots-three-horizontal' size={24} color='white' />
          </TouchableOpacity>
        )
      }
    })
  }, [])

  const { data, isLoading } = useGetRecipe(route.params.data.id)

  if (isLoading) {
    return <Text>Loading</Text>
  } else {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { color: 'black', fontFamily: 'mt-semibold', fontSize: 14 },
          tabBarIndicatorStyle: { backgroundColor: '#749063' }
        }}
      >
        <Tab.Screen
          name='Описание'
          component={RecipeDetailDescription}
          initialParams={{ recipe: data }}
        />
        <Tab.Screen
          name='Состав'
          component={RecipeDetailCompund}
          initialParams={{ recipe: data }}
        />
        <Tab.Screen name='Шаги' component={RecipeDetailSteps} initialParams={{ recipe: data }} />
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    maxWidth: 900,
    marginHorizontal: 'auto'
  }
})
