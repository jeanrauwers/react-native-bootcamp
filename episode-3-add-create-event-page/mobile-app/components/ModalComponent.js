import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Modal, Dimensions, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'

const widowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import * as ImagePicker from 'expo-image-picker';


const ModalComponent = ({ isVisible, setIsVisible, user }) => {
  const [eventTitle, setEventTitle] = useState(null)
  const [eventDescription, setEventDescription] = useState(null)
  const [eventPrice, setEventPrice] = useState(null)
  const [eventSport, setEventSport] = useState('Running')
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
          <Text style={styles.modalText}>Create a New Event</Text>
          <View style={styles.form}>
            <View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={pickImage}
              >
                <Text>Pick an Image!</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            <View>
              <Text style={styles.label}>Event Title:</Text>
              <TextInput style={styles.input} placeholder={"Event Title"} autoCapitalize='none' autoCorrect={false} value={eventTitle} onChangeText={text => console.log(text)} />
              <Text style={styles.label}>Event Description:</Text>
              <TextInput style={styles.input} placeholder={"Event Description"} autoCapitalize='none' autoCorrect={false} value={eventDescription} onChangeText={text => console.log(text)} />
              <Text style={styles.label}>Event Price:</Text>
              <TextInput style={styles.input} placeholder={"Price in $00,00"} autoCapitalize='none' autoCorrect={false} value={eventPrice} onChangeText={text => console.log(text)} />
            </View>
            <View>
              <Text style={styles.label}>Sport: {eventSport}</Text>
              <Picker selectedValue={eventSport} onValueChange={value => setEventSport(value)}>
                <Picker.Item label={'Running'} value={'Running'} />
                <Picker.Item label={'Cycling'} value={'Cycling'} />
                <Picker.Item label={'Swimming'} value={'Swimming'} />
              </Picker>

            </View>


          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
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
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height: windowHeight,
    width: widowWidth,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
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
    marginBottom: 30,
    borderRadius: 4
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
});

export default ModalComponent;