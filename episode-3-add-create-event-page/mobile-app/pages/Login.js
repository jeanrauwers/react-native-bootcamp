import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import isLoggedIn from '../hooks/isLoggedIn';

const bgImage = require('../assets/background.jpg');

const Login = ({ navigation }) => {
  const [user, user_id] = isLoggedIn();
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(() => {
    if (user !== null && user_id !== null) navigation.navigate('Dashboard');
  }, [])

  const submitHandler = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      })

      const { user, user_id } = await response.json()

      if (user && user_id) {
        await AsyncStorage.setItem('user', user);
        await AsyncStorage.setItem('user_id', user_id);
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.log('🚀 --------------------------------------------------------------')
      console.log('🚀 ~ file: Register.js ~ line 19 ~ submitHandler ~ error', error)
      console.log('🚀 --------------------------------------------------------------')

    }
  }

  const registerInsteadHandler = () => {
    setEmail(null)
    setPassword(null)
    navigation.navigate('Register')
  }


  useEffect(() => {
    if (user && user_id) navigation.navigate('Dashboard')
  }, [user, user_id])

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
        <Text style={styles.title}>Sport's App</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input}
            placeholder="Email:"
            placeholderTextColor="#ffffff"
            keyboardType="email-address"
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none" />

          <Text style={styles.label}>Password:</Text>
          <TextInput style={styles.input}
            placeholder="Password:"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            autoCorrect={false}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none" />
          <TouchableOpacity style={styles.primaryBtn} onPress={submitHandler}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={registerInsteadHandler}>
            <Text style={{ color: 'white', fontWeight: 'bold' }} >Register Instead</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#f04a5b"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: "bold",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: "400",
    height: 44,
    marginBottom: 30,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  primaryBtn: {
    height: 42,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  },
  secondaryBtn: {
    height: 42,
    backgroundColor: '#f04a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  }
})


export default Login