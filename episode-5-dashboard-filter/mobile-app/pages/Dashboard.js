import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image } from 'react-native'
import isLoggedIn from '../hooks/isLoggedIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionButton from 'react-native-action-button';
import ModalComponent from '../components/ModalComponent'

const bgImage = require('../assets/background.jpg');
import { FontAwesome5, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

const DashBoard = ({ navigation }) => {
  const [user, user_id] = isLoggedIn({ navigation });
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [events, setEvents] = useState([])

  useEffect(() => {
    loadEvents('')
  }, [user])

  const loadEvents = async (query = '') => {
    const response = await fetch(`http://localhost:8080/api/dashboard/${query}`, {
      method: 'GET',
      headers: { user: user }
    })

    const jsonResponse = await response.json()
    setEvents(jsonResponse.events)
  }

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('user_id');
    navigation.navigate('Login')
  }

  const deleteEventHandler = async (eventId) => {
    await fetch(`http://localhost:8080/api/event/${eventId}`, {
      method: 'DELETE',
      headers: { user: user }
    })

    loadEvents()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.image}>
          <Text style={styles.title}>DashBoard</Text>
          <FlatList
            style={styles.list}
            data={events}
            showHorizontalScrollIndicator={true}
            keyExtractor={event => event._id}
            renderItem={({ item }) => {
              return (<View style={styles.listItem}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.thumbnail_url }}
                />
                <Text style={styles.eventTitle}><Text style={styles.boldText}>Title:</Text> {item.title}</Text>
                <Text style={styles.sport}><Text style={styles.boldText}>Sport:</Text> {item.sport}</Text>
                <Text style={styles.price}><Text style={styles.boldText}>Price:</Text> {'$' + item.price}</Text>
                <Text style={styles.description}><Text style={styles.boldText}>Description:</Text> {item.description}</Text>
                { item.user === user_id ? <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteEventHandler(item._id)}>
                  <MaterialIcons name="delete-forever" size={36} color="red" />
                </TouchableOpacity> : null}
                <TouchableOpacity style={styles.primaryBtn} onPress={() => console.log('Register')}>
                  <Text style={{ color: "#FFFF" }}>Register</Text>
                </TouchableOpacity>
              </View>)
            }}>

          </FlatList>
          <ModalComponent isVisible={modalIsVisible} setIsVisible={setModalIsVisible} user={user} loadEvents={loadEvents} />
          <TouchableOpacity onPress={logoutHandler}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ActionButton buttonColor='#007bff' offsetX={0} offsetY={0}>
          <ActionButton.Item buttonColor='#9b59b6' title="New Event" onPress={() => setModalIsVisible(true)}>
            <Ionicons name='ios-create' style={styles.actionButton} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title="All Events" onPress={() => loadEvents()}>
            <FontAwesome5 name="infinity" size="24" color="white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1abc9c" title="Running" onPress={() => loadEvents('Running')}>
            <FontAwesome5 name='running' style={styles.actionButton} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1abc9c" title="Cycling" onPress={() => loadEvents('Cycling')}>
            <FontAwesome5 name='bicycle' style={styles.actionButton} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1abc9c" title="Swimming" onPress={() => loadEvents('Swimming')}>
            <MaterialCommunityIcons name='swim' style={styles.actionButton} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: 'center'
  },
  list: {
    width: "100%",
    paddingHorizontal: 20
  },
  listItem: {
    padding: 8,
    backgroundColor: "#FFFF",
    marginVertical: 8,
    opacity: 0.9
  },
  thumbnail: {
    width: 'auto',
    height: 150,
    marginBottom: 8
  },
  eventTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 15,
  },
  sport: {
    fontSize: 16,
    color: "#444",
  },
  price: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: "#444",
  },
  boldText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: "#444"
  },
  primaryBtn: {
    height: 42,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  },
  actionButton: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  deleteBtn: {
    position: 'relative',
    backgroundColor: '#ffff',
    width: 36,
    left: '92%',
    bottom: '73%'
  }
})


export default DashBoard;