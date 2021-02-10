import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { color } from 'react-native-reanimated'

const bgImage = require('../assets/background.jpg')

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
        <Text style={styles.title}>Sport's App</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text>Go to Routes PAGE</Text>
        </TouchableOpacity>
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
  }


})


export default Login