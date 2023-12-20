import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
// import Home from './components/Home'
import Product from './components/Product/Product/Product'
// import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProductDetail from './components/Product/ProductDetail/ProductDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MenuProvider } from 'react-native-popup-menu'
import Auth from './components/Auth'
import Recipe from './components/Recipe/Recipe/Recipe'
import RecipeDetail from './components/Recipe/RecipeDetail/RecipeDetail'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
// const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors
    //   background: 'red'
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <QueryClientProvider client={queryClient}>
        <MenuProvider>
          <TabNavigator></TabNavigator>
        </MenuProvider>
      </QueryClientProvider>
    </NavigationContainer>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='recipes'
        component={RecipeScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: 'Рецепты',
          tabBarStyle: {
            backgroundColor: '#749063'
          },
          tabBarLabelStyle: {
            color: 'white',
            fontFamily: 'mt-semibold'
          },
          tabBarIcon: tabInfo => {
            return (
              <MaterialCommunityIcons
                name='book'
                size={24}
                color={tabInfo.focused ? '#fff' : '#000'}
              />
            )
          }
        })}
      />
      <Tab.Screen
        name='products'
        component={ProductScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: 'Продукты',
          tabBarStyle: {
            backgroundColor: '#749063'
          },
          tabBarLabelStyle: {
            color: 'white',
            fontFamily: 'mt-semibold'
          },
          tabBarIcon: tabInfo => {
            return (
              <MaterialCommunityIcons
                name='baguette'
                size={24}
                color={tabInfo.focused ? '#fff' : '#000'}
              />
            )
          }
        })}
      />
      <Tab.Screen
        name='account'
        component={AccountScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: 'Аккаунт',
          tabBarStyle: {
            backgroundColor: '#749063'
          },
          tabBarLabelStyle: {
            color: 'white',
            fontFamily: 'mt-semibold'
          },
          tabBarIcon: tabInfo => {
            return (
              <MaterialCommunityIcons
                name='account'
                size={24}
                color={tabInfo.focused ? '#fff' : '#000'}
              />
            )
          }
        })}
      />
    </Tab.Navigator>
  )
}

const AccountScreen = () => {
  if (true) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='auth'
          component={Auth}
          options={({ route }) => ({
            title: 'Аккаунт',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'mt-semibold',
              fontSize: 20,
              color: 'white'
              // width: "80%",
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#749063',
              fontFamily: 'mt-semibold',
              width: '80%'
            }
          })}
        ></Stack.Screen>
      </Stack.Navigator>
    )
  }
  // return (
  //   <Stack.Navigator>
  //     <Stack.Screen
  //       name=
  //     >
  //     </Stack.Screen>
  //   </Stack.Navigator>
  // )
}

const RecipeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='RecipeList'
        component={Recipe}
        options={({ navigation }) => ({
          // title: 'Продукты',
          headerShown: false,
          headerTitle: '',
          headerTitleAlign: 'center',

          headerTitleStyle: {
            fontFamily: 'mt-semibold',
            fontSize: 20,
            color: 'white'
          },
          headerStyle: {
            backgroundColor: '#749063',
            fontFamily: 'mt-semibold'
          }
        })}
      />
      <Stack.Screen
        name='RecipeDetail'
        component={RecipeDetail}
        options={({ route }) => ({
          title: route.params.data.title,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'mt-semibold',
            fontSize: 20,
            color: 'white'
            // width: "80%",
          },
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#749063',
            fontFamily: 'mt-semibold',
            width: '80%'
          }
        })}
      />
    </Stack.Navigator>
  )
}

const ProductScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ProductList'
        component={Product}
        options={({ navigation }) => ({
          // title: 'Продукты',
          headerShown: false,
          headerTitle: '',
          headerTitleAlign: 'center',

          headerTitleStyle: {
            fontFamily: 'mt-semibold',
            fontSize: 20,
            color: 'white'
          },
          headerStyle: {
            backgroundColor: '#749063',
            fontFamily: 'mt-semibold'
          }
        })}
      />
      <Stack.Screen
        name='ProductDetail'
        component={ProductDetail}
        options={({ route }) => ({
          title: route.params.data.title,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'mt-semibold',
            fontSize: 20,
            color: 'white'
            // width: "80%",
          },
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#749063',
            fontFamily: 'mt-semibold',
            width: '80%'
          }
        })}
      />
    </Stack.Navigator>
  )
}
