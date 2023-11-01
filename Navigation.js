import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import Home from './components/Home'
import Product from './components/Product'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProductDetail from './components/ProductDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MenuProvider } from 'react-native-popup-menu'

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
          <Tab.Navigator>
            {/* <Tab.Screen
          name='Home'
          component={Home}
          options={({ navigation }) => ({
            title: 'Главная',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'mt-semibold',
              fontSize: 20
            },
            headerStyle: {
              backgroundColor: '#749063',
              fontFamily: 'mt-semibold'
            },
            tabBarStyle: {
              backgroundColor: '#749063'
            },
            tabBarLabelStyle: {
              color: 'white',
              fontFamily: 'mt-semibold'
              // color={tabInfo.focused ? "#fff" : "#000"}
            },
            tabBarIcon: tabInfo => {
              return (
                <Ionicons name='md-home' size={24} color={tabInfo.focused ? '#fff' : '#000'} />
                // <Icon path={mdiAccount} />
                // <Icon name="baguette" />
              )
            }
          })}
        /> */}
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
          </Tab.Navigator>
        </MenuProvider>
      </QueryClientProvider>
    </NavigationContainer>
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
          // headerShown: false,
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
