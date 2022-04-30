import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity, Image } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';
import "firebase/storage"
import * as ImagePicker from 'expo-image-picker';

const db = Firebase.firestore()
const auth = Firebase.auth();

export default function ProfileEditor({navigation, route}) {
  const { userData } = route.params;
  const [profUsername, setProfUsername] = useState('');
  const [finished, setFinished] = useState(false)
  const [url, setUrl] = useState('')
  const [profTitle, setProfTitle] = useState('');


  const uploadImage = async (uri) => {

    const response = await fetch(uri, "profile");
    const blob = await response.blob();
    await auth.onAuthStateChanged(user =>{
      if(user){
        var ref = Firebase.storage().ref("images/" + user.uid + '/prof.png');
        ref.put(blob);
        Firebase.storage().ref("images/" + user.uid + '/prof.png').getDownloadURL().then(imgUrl =>{
          setUrl(imgUrl)
        })
      }
      setFinished(true)
    })
  }
  
  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      uploadImage(result.uri)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  }

  const updateProf = async () => {
    await auth.onAuthStateChanged(user =>{
      if(user){
        console.log(user.uid)
        console.log(url)
        var userRef = db.collection("newusers").doc(user.uid);
        userRef.update({
          username: profUsername,
          profTitle: profTitle,
          profUrl: url
        })
        navigation.navigate('ProfileScreen')
      }
    })
  }

    return (
      <View style={styles.backgroundImage}>
          <View style={styles.HeaderContainer}>
            <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
              <View style={styles.backButton}>
                <Icon size={40} name="arrow-left" type='feather' color='#000'/>
              </View>
            </Pressable>
          </View>
          <View style={styles.inputContaier}>
          <View style={styles.InputView}>
          <Text style={styles.InputLabel}>Username</Text>
              <TextInput 
                  style={styles.Question}
                  onChangeText={text => setProfUsername(text)}
                  value={profUsername}
                  placeholder={"Current: " + userData.username}
                  maxLength = {40}
              />
            </View>
            <View style={styles.InputView}>
              <Text style={styles.InputLabel}>Prof Title</Text>
            <TextInput 
                style={styles.Question}
                onChangeText={text => setProfTitle(text)}
                value={profTitle}
                placeholder={"Current: " + userData.profTitle}
                maxLength = {40}
                require={true}
            />
            </View>
          </View>
          <TouchableOpacity style={styles.Submit} onPress={() => {onChooseImagePress()}}>
             <Text style={styles.SubmitText}>Upload Photo</Text>
         </TouchableOpacity>
         {finished ? <Text style={styles.successUpload}>Photo Uploaded</Text>: <></>}
          <TouchableOpacity style={styles.Submit} onPress={() => {updateProf()}}>
             <Text style={styles.SubmitText}>Update Profile</Text>
         </TouchableOpacity>
        
      </View>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex : 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    paddingBottom: 60,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  InputView: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
  },
  InputLabel: {
    fontSize: 25,
  },
  HeaderContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between'
  },
  Header: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  Question: {
    height: 40,
    width: '100%',
    height: 'auto',
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 25,
  },
  Description: {
    height: 400,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 10,
    textAlign: 'left',
  },
  inputContaier: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    marginTop: 20,
  },
  Submit: {
    marginVertical: 10,
    marginHorizontal: 60,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: "black",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitText: {
    color: "white",
    fontSize: 20,
  },
  successUpload: {
    fontSize: 20,
    backgroundColor: '#4BB54399',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
    textAlign: 'center',
    width: '50%',
    alignSelf: 'center'
  },
  backButton: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 30
  },
  text: {
      fontSize: 20,
      fontWeight: 'bold'
  }
});