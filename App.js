import { StyleSheet, Text, View } from 'react-native'
import Navigation from './Navigation'
import * as Font from 'expo-font'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'

const fonts = () =>
  Font.loadAsync({
    'mt-semibold': require('./assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    'mt-medium': require('./assets/fonts/Montserrat/static/Montserrat-Medium.ttf')
  })

export default function App() {
  const [font, setFont] = useState()
  if (font) {
    return <Navigation styles={styles.container}></Navigation>
  } else {
    return <AppLoading startAsync={fonts} onFinish={() => setFont(true)} onError={console.warn} />
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 100,
    fontFamily: 'mt-semibold'
  }
})
