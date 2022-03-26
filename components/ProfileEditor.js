import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';
import "firebase/storage"
import { auth, db } from '../config/firebase';
import * as ImagePicker from 'expo-image-picker';



export default function ProfileEditor({navigation}) {
  
  const [profUsername, setProfUsername] = useState('');
  const [profTitle, setProfTitle] = useState('');
  
  var url
  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      uploadImage(result.uri, "prof")
        .then(() => {
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }
  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    await onAuthStateChanged(auth,user =>{
      if(user){
        var ref = db.storage().ref("images/" + user.uid + '/prof.png');
        ref.put(blob);
        db.storage().ref("images/" + user.uid + '/prof.png').getDownloadURL().then(imgUrl =>{
          url = imgUrl;
        })
      }
    })
  }
  const updateProf = async () => {
    await onAuthStateChanged(auth,user =>{
      if(user){
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
            <Text style={styles.Header}>Edit Profile</Text>
                <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
                    <View style={styles.backButton}>
                    <Icon size={40} name="arrow-left" type='material' color='#000'/>
                    <Text style={styles.text}>Exit</Text>
                    </View>
                </Pressable>
          </View>
          <View style={styles.inputContaier}>
            <TextInput 
                style={styles.Question}
                onChangeText={text => setProfUsername(text)}
                value={profUsername}
                placeholder="Username"
                maxLength = {40}
            />
            <TextInput 
                style={styles.Question}
                onChangeText={text => setProfTitle(text)}
                value={profTitle}
                placeholder="Title"
                maxLength = {40}
                require={true}
            />
          </View>
         <View style={styles.Submit}>
             <Button
                onPress={() => {updateProf()}}
                title="Update Your Profile"
                color="#000"
                accessibilityLabel="Learn more about this purple button"
            />
         </View>
         <View style={styles.Submit}>
             <Button
                onPress={() => {onChooseImagePress()}}
                title="Upload Picture"
                color="#000"
                accessibilityLabel="Learn more about this purple button"
            />
         </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex : 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
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