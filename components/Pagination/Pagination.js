import { StyleSheet, Animated, View } from 'react-native'
import React from 'react'

const Pagination = ({ data, scrollX, width }) => {
  if (data?.length > 1) {
    return (
      <View style={styles.container}>
        {data.map((_, idx) => {
          const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [12, 30, 12],
            extrapolate: 'clamp'
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.1],
            extrapolate: 'clamp'
          })

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#ccc', '#000', '#ccc'],
            extrapolate: 'clamp'
          })

          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                { width: dotWidth, backgroundColor }
                //   idx === index && styles.dotActive,
              ]}
            />
          )
        })}
      </View>
    )
  }
}

export default Pagination

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: '#ccc'
  },
  dotActive: {
    backgroundColor: '#000'
  }
})
