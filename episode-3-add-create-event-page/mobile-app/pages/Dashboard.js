import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image } from 'react-native'

const bgImage = require('../assets/background.jpg')

const DashBoard = ({ navigation }) => {
  const [events, setEvents] = useState([{
    _id: 'idblah',
    title: 'London 5K running',
    sport: 'Running',
    description: "The best 5K event in London",
    price: "39.00",
    thumbnail_url: 'https://admin.concern.org.uk/sites/default/files/styles/hero_desktop/public/media/images/2019-06/London%20Marathon%20-%20Jenny%20Flynn.jpg/'
  },
  {
    _id: 'idbah',
    title: 'London 5K running',
    sport: 'Running',
    description: "The best 5K event in London",
    price: "39.00",
    thumbnail_url: 'https://admin.concern.org.uk/sites/default/files/styles/hero_desktop/public/media/images/2019-06/London%20Marathon%20-%20Jenny%20Flynn.jpg/'
  },
  {
    _id: 'idbla',
    title: 'London 5K running',
    sport: 'Running',
    description: "The best 5K event in London",
    price: "39.00",
    thumbnail_url: 'https://admin.concern.org.uk/sites/default/files/styles/hero_desktop/public/media/images/2019-06/London%20Marathon%20-%20Jenny%20Flynn.jpg/'
  }])

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

              console.log('🚀 ---------------------------------------------------------')
              console.log('🚀 ~ file: Dashboard.js ~ line 51 ~ DashBoard ~ item', item)
              console.log('🚀 ---------------------------------------------------------')

              return (<View style={styles.listItem}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.thumbnail_url }}
                />
                <Text style={styles.eventTitle}><Text style={styles.boldText}>Title:</Text> {item.title}</Text>
                <Text style={styles.sport}><Text style={styles.boldText}>Sport:</Text> {item.sport}</Text>
                <Text style={styles.price}><Text style={styles.boldText}>Price:</Text> {'$' + item.price}</Text>
                <Text style={styles.description}><Text style={styles.boldText}>Description:</Text> {item.description}</Text>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => console.log('Register')}>
                  <Text style={{ color: "#FFFF" }}>Register</Text>
                </TouchableOpacity>
              </View>)
            }}>

          </FlatList>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </ImageBackground>
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
})


export default DashBoard