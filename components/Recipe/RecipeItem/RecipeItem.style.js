import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%'
  },
  card: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '80%',
    // flex:1,
    // alignItems: 'center',
    // height: 70,
    marginTop: 10,
    // margin: 'auto',
    // justifyContent: 'center',

    // paddingHorizontal: 10,
    backgroundColor: '#FFF',
    // borderWidth: 1,
    borderRadius: 8
  },
  card_image: {
    // height: 200,
    // width: '100%',
    // backgroundColor: 'grey',
    // borderRadius: 8
    // margin: 10,
    // marginHorizontal: 10,
  },
  text: {},
  card_content: {
    padding: 10
    // flex: 1,
    // justifyContent: 'center',
    // margin: 'auto'
  },
  card_title: {
    // padding: 10
  },
  card_title_text: {
    fontSize: 16,
    fontFamily: 'mt-semibold'
  },
  card_description: {
    // flex: 1,
    flexDirection: 'row',
    // flexBasis: "auto",
    width: '100%'
    // justifyContent: "space-between",
  },
  card_description_col: {
    flex: 1
  },
  card_description_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})

export default styles
