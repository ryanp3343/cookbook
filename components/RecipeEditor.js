import { StatusBar } from 'expo-status-bar';
import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity, Alert } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
import "firebase/storage"
import { useState } from 'react';
import { LogBox } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const db = Firebase.firestore()
const auth = Firebase.auth();

LogBox.ignoreAllLogs()

export default function RecipeEditor({navigation}) {
  const [Recipe, setRecipe] = useState('');
  const [Ingredients, setIngredients] = useState('');
  const [Directions, setDirections] = useState('');
  const [imgUrl,  setimgUrl] = useState('');
  const [vidUrl , setVidUrl] = useState('');
   
  const uploadImage = async (uri) => {
    const response = await fetch(uri,'recipe');
    const blob = await response.blob();
    await auth.onAuthStateChanged(user => {
      if(user){
            const uploadTask = Firebase.storage().ref("images/" + user.uid + '/recipe.png').put(blob);
            uploadTask.on('state_changed',
            (snapshot)=>{
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("upload is " + progress + '% done');
              switch(snapshot.state){
                case 'paused':
                  console.log("paused")
                  break;
                case 'running':
                  console.log('running')
                  break;
              }
            },
            (error) => {

            },
            () =>{
              Firebase.storage().ref("images/" + user.uid + '/recipe.png').getDownloadURL().then(vidurl =>{
                setimgUrl(vidurl);
              });
            }
          )
      }
    })
  }

  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      await uploadImage(result.uri)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  }

  const onChooseVideoPress = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos
    })
    if(!result.cancelled){
      await uploadVideo(result.uri)
        .then(() => {
          console.log("success")
        })
        .catch((error) =>{
          console.log(error)
        })
    }
  }

  const uploadVideo = async (uri) =>{
    const response = await fetch(uri,'recipe');
    const blob = await response.blob();
    await auth.onAuthStateChanged(user => {
      if(user){
            const uploadTask = Firebase.storage().ref("images/" + user.uid + '/recipe.mp4').put(blob);
            uploadTask.on('state_changed',
            (snapshot)=>{
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress)
              switch(snapshot.state){
                case 'paused':
                  console.log("pause")
                  break;
                case 'running':
                  console.log('running')
                  break;
              }
            },
            (error) => {

            },
            () =>{
              Firebase.storage().ref("images/" + user.uid + '/recipe.mp4').getDownloadURL().then(vidurl =>{
                setVidUrl(vidurl);
              });
            }
          )
      }
    })
  }
  
  const createRecipe = async () => {
    await auth.onAuthStateChanged(user =>{
      if(user){
        db.collection("newusers").doc(user.uid).get().then((docRef) => {
          const snapshot = docRef.data();
          db.collection("newrecipes").doc()
          .set({
            Name: snapshot.username,
            Uid: user.uid,
            Title: Recipe,
            Ingredients: Ingredients,
            Directions: Directions,
            Url: imgUrl,
            VidUrl: vidUrl,
            pfpUrl: snapshot.profUrl,
            CookedScore: 0,
            CookedVal: 0,
            Cooked: 0,
            Date: firebase.firestore.Timestamp.now(),
            Comments: [],
          })
        })
      }
    })
  };

    return (
      <View style={styles.backgroundImage}>
          <View style={styles.HeaderContainer}>
            <Pressable onPress={() => navigation.navigate('RecipesList')}>
              <View style={styles.backButton}>
                <Icon size={40} name="arrow-left" type='feather' color='#000'/>
              </View>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.inputContaier}>
            <TextInput 
                style={styles.Recipe}
                onChangeText={text => setRecipe(text)}
                value={Recipe}
                placeholder="Recipe Title"
            />
            <TextInput 
                style={styles.Ingredients}
                onChangeText={text => setIngredients(text)}
                value={Ingredients}
                placeholder="Ingredients"
                multiline={true}
                numberOfLines={3}
                require={true}
                textAlignVertical={'top'}
            />
            <TextInput 
                style={styles.Directions}
                onChangeText={text => setDirections(text)}
                value={Directions}
                placeholder="Directions"
                multiline={true}
                numberOfLines={3}
                require={true}
                textAlignVertical={'top'}
            />
            <View style={styles.Submit}>
                <Button
                   onPress={() => {onChooseImagePress()}}
                   title="Upload Picture"
                   color="#000"
               />
            </View>
            <View style={styles.Submit}>
                <Button
                   onPress={() => {onChooseVideoPress()}}
                   title="Upload Video"
                   color="#000"
               />
            </View>
            <View style={styles.Submit}>
                <Button
                   onPress={() => {createRecipe(Recipe)}}
                   title="Submit Recipe"
                   color="#000"
               />
            </View>
         </ScrollView>
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
  Recipe: {
    height: 40,
    width: '100%',
    margin: 12,
    fontSize: 20,
    borderBottomWidth: 1,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  Ingredients: {
    height: 400,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 10,
    textAlign: 'left',
  },
  Directions: {
    height: 400,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 10,
    textAlign: 'left',
  },
  inputContaier: {
    paddingHorizontal: 20,
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