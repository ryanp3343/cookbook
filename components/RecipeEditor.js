import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
import "firebase/storage"
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const db = Firebase.firestore()
const auth = Firebase.auth();


export default function RecipeEditor({navigation}) {
   
  var url
  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
  
    if (!result.cancelled) {
      uploadImage(result.uri, "recipe")
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
    await auth.onAuthStateChanged(user =>{
      if(user){
        var ref = Firebase.storage().ref("images/" + user.uid + '/recipe.png');
        ref.put(blob);
        Firebase.storage().ref("images/" + user.uid + '/recipe.png').getDownloadURL().then(imgUrl =>{
          url = imgUrl;
        })
      }
    })
  
  }
  console.log(url)
  
  const [Recipe, setRecipe] = useState('');
  const [Ingredients, setIngredients] = useState('');
  const [Directions, setDirections] = useState('');
  const createRecipe = async () => {
  
    await auth.onAuthStateChanged(user =>{
      if(user){
        db.collection("newusers").doc(user.uid).get().then((docRef) => {
          const snapshot = docRef.data();
          db.collection("newrecipes").doc(user.uid)
          .set({
            Name: snapshot["username"],
            Uid: user.uid,
            Title: Recipe,
            Ingredients: Ingredients,
            Directions: Directions,
            Url: url,
            CookedScore: 0,
            CookedVal: 0,
            Cooked: 0,
            Date:  Firebase.firestore.FieldValue.serverTimestamp(),
          })
        })
      }
    })
  };

    return (
      <View style={styles.backgroundImage}>
          <View style={styles.HeaderContainer}>
            <Pressable onPress={() => navigation.navigate('List')}>
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