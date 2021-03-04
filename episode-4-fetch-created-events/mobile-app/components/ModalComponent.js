import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, Image } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const widowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'


const ModalComponent = ({ isVisible, setIsVisible, user, loadEvents }) => {
  const [eventTitle, setEventTitle] = useState(null)
  const [eventDescription, setEventDescription] = useState(null)
  const [eventPrice, setEventPrice] = useState(null)
  const [eventSport, setEventSport] = useState('Running')
  const [eventDate, setEventDate] = useState(new Date())
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitEventHandler = async () => {
    const localUri = image;
    const filename = localUri.split('/').pop()
    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`;

    const data = new FormData()

    data.append('thumbnail', { uri: localUri, name: filename, type })
    data.append('title', eventTitle)
    data.append('description', eventDescription)
    data.append('price', eventPrice)
    data.append('date', eventDate)
    data.append('sport', eventSport)

    try {
      await fetch(`http://localhost:8080/api/event`, {
        method: 'POST',
        body: data,
        headers: { user: user }
      })
      loadEvents()
      cancelEventHandler()
    } catch (error) {
      console.log('🚀 -------------------------------------------------------------------------')
      console.log('🚀 ~ file: ModalComponent.js ~ line 60 ~ submitEventHandler ~ error', error)
      console.log('🚀 -------------------------------------------------------------------------')

    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setEventDate(currentDate);
  };

  const cancelEventHandler = () => {
    setIsVisible(!isVisible)
    setImage(null)
    setEventTitle(null)
    setEventDescription(null)
    setEventDate(new Date())
    setEventSport('Running')
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setIsVisible(!setIsVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.form}>
            <View>

              {image ? <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: image }} style={styles.loadedImage} />
              </TouchableOpacity> :
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={pickImage}
                >
                  <MaterialIcons name="add-a-photo" size={56} color="black" />
                </TouchableOpacity>}
            </View>
            <View>
              <Text style={styles.label}>Event Title:</Text>
              <TextInput style={styles.input} placeholder={"Event Title"} autoCapitalize='none' autoCorrect={false} value={eventTitle} onChangeText={text => setEventTitle(text)} />
              <Text style={styles.label}>Event Description:</Text>
              <TextInput style={styles.input} placeholder={"Event Description"} autoCapitalize='none' autoCorrect={false} value={eventDescription} onChangeText={text => setEventDescription(text)} />
              <Text style={styles.label}>Event Price:</Text>
              <TextInput style={styles.input} placeholder={"Price in $00,00"} autoCapitalize='none' autoCorrect={false} value={eventPrice} onChangeText={text => setEventPrice(text)} />
            </View>
            <View>
              <Text style={styles.label}>Event Date:</Text>
              <DateTimePicker
                value={eventDate}
                mode='date'
                onChange={onChange}
              />
            </View>
            <View>
              <Text style={styles.label}>Sport: {eventSport}</Text>
              <Picker mode={"dialog"} style={styles.sportPicker} selectedValue={eventSport} onValueChange={value => setEventSport(value)}>
                <Picker.Item label={'Running'} value={'Running'} />
                <Picker.Item label={'Cycling'} value={'Cycling'} />
                <Picker.Item label={'Swimming'} value={'Swimming'} />
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={submitEventHandler}
          >
            <Text style={styles.textStyle}>Submit Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={cancelEventHandler}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    height: windowHeight,
    width: widowWidth,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  form: {
    alignSelf: "stretch",
    marginTop: 16
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: "bold",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000000',
    fontWeight: "400",
    height: 44,
    shadowColor: '#000000',
    marginBottom: 15,
    borderRadius: 4
  },
  primaryBtn: {
    height: 42,
    width: '100%',
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10
  },
  secondaryBtn: {
    height: 42,
    width: '100%',
    backgroundColor: '#f04a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10
  },
  addImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    width: '100%',
    height: 150
  },
  loadedImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportPicker: {

  }
});

export default ModalComponent;