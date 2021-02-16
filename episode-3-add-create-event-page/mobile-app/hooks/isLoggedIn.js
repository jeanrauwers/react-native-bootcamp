import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const isLoggedIn = (navigation) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const userId = await AsyncStorage.getItem('user_id');
        if (user !== null && userId !== null) {
          setUser(user);
          setUserId(userId);
        } else {
          navigation.navigate('Login')
        }
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])
  return [user, userId]
};



export default isLoggedIn;