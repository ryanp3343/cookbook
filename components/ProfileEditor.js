import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';
import "firebase/storage"
import * as ImagePicker from 'expo-image-picker';

const db = Firebase.firestore()
const auth = Firebase.auth();

export default function ProfileEditor({navigation}) {
  
  const [profUsername, setProfUsername] = useState('');
  const [profTitle, setProfTitle] = useState('');
  
  var url

  const uploadImage = async (uri) => {
    const response = await fetch(uri, "profile");
    const blob = await response.blob();
    await auth.onAuthStateChanged(user =>{
      if(user){
        var ref = Firebase.storage().ref("images/" + user.uid + '/prof.png');
        ref.put(blob);
        Firebase.storage().ref("images/" + user.uid + '/prof.png').getDownloadURL().then(imgUrl =>{
          url = imgUrl;
        })
      }
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
        var userRef = db.collection("newusers").doc(user.uid);
        userRef.update({
          profUsername: profUsername,
          profTitle: profTitle,
          profUrl: url
        })
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
            <TextInput 
                style={styles.Question}
                onChangeText={text => setProfUsername(text)}
                value={profUsername}
                placeholder="New username"
                maxLength = {40}
            />
            <TextInput 
                style={styles.Question}
                onChangeText={text => setProfTitle(text)}
                value={profTitle}
                placeholder="New title"
                maxLength = {40}
                require={true}
            />
          </View>
         <TouchableOpacity style={styles.Submit}>
             <Button
                onPress={() => {updateProf()}}
                title="Update Your Profile"
                color="#000"
                accessibilityLabel="Learn more about this purple button"
            />
         </TouchableOpacity>
         <TouchableOpacity style={styles.Submit} >
             <Button
                onPress={() => {onChooseImagePress()}}
                title="Upload Picture"
                color="#000"
                accessibilityLabel="Learn more about this purple button"
            />
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
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
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
    alignItems: 'center'
  },
  Submit: {
    margin: 8,
    paddingHorizontal:80,
    color: "white",
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