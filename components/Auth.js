import * as React from 'react'
import { useState } from 'react'
import { Text, StyleSheet, TextInput, View, Button } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import * as Keychain from 'react-native-keychain'
import { useLogin, useLoginConfirm } from '../hooks/auth/useLogin'
// import TextInputMask from 'react-native-text-input-mask';

export default function Auth({ navigation }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [userId, setUserId] = useState(undefined)
  const [codeIsSent, setCodeIsSent] = useState(false)
  const { mutateAsync: setLogin } = useLogin()
  const { mutateAsync: setLoginConfirm } = useLoginConfirm()

  const sendCode = async () => {
    if (phone.length === 10) {
      const res = await setLogin('+7' + phone)
      console.log(res.data.id)
      setUserId(res.data.id)
      // await Keychain.setGenericPassword(username, password);
      setCodeIsSent(true)
    }
  }
  const resendCode = async () => {
    // const credentials = await Keychain.getGenericPassword();
    await setLogin('+7' + phone)
  }
  const changeNumber = () => {
    setCodeIsSent(false)
  }

  const submitCode = async () => {
    if (code.length === 4) {
      const res = await setLoginConfirm({ id: userId, code })
      await Keychain.setGenericPassword(userId, res.data.access_token)
    }
  }
  const testKeychain = async () => {
    console.log(await Keychain.getGenericPassword())
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row'
          // justifyContent: 'space-between',
        }}
      >
        <MaskInput
          editable={!codeIsSent}
          selectTextOnFocus={!codeIsSent}
          style={{ ...styles.input, width: '100%' }}
          value={phone}
          keyboardType='number-pad'
          mask={[
            '+',
            '7',
            '(',
            /\d/,
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/
          ]}
          onChangeText={(masked, unmasked) => {
            setPhone(unmasked) // you can use the unmasked value as well
            // assuming you typed "9" all the way:
            console.log(masked) // (99) 99999-9999
            console.log(unmasked) // 99999999999
          }}
        />
        {codeIsSent && <Button title='Изменить' onPress={changeNumber} />}
      </View>
      {codeIsSent ? (
        <>
          <MaskInput
            keyboardType='number-pad'
            style={styles.input}
            value={code}
            mask={[/\d/, /\d/, /\d/, /\d/]}
            onChangeText={(masked, unmasked) => {
              setCode(unmasked) // you can use the unmasked value as well
              if (unmasked.length === 4) {
                submitCode()
              }
              // assuming you typed "9" all the way:
              console.log(masked) // (99) 99999-9999
              console.log(unmasked) // 99999999999
            }}
          />
          {/* <Button title='Изменить номер' onPress={changeNumber} /> */}

          <Button title='Отравить повторно' onPress={resendCode} />
        </>
      ) : (
        <>
          <Button title='Подтвердить' onPress={sendCode}></Button>
        </>
      )}
      <Button title='check' onPress={testKeychain}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    marginBottom: 16
  },
  input: {
    // flex:8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8
  }
})
