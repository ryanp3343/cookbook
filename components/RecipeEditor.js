import { StatusBar } from 'expo-status-bar';
import React from 'react';
import firebase from 'firebase';
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
  const [Recipe, setRecipe] = useState('');
  const [Ingredients, setIngredients] = useState('');
  const [finished, setFinished] = useState(false)
  const [url, setUrl] = useState('')
  const [Directions, setDirections] = useState('');
   
  const uploadImage = async (uri) => {
    const response = await fetch(uri, "recipe");
    const blob = await response.blob();
    await auth.onAuthStateChanged(user =>{
      if(user){
        var ref = Firebase.storage().ref("images/" + user.uid + '/recipe.png');
        ref.put(blob);
        Firebase.storage().ref("images/" + user.uid + '/recipe.png').getDownloadURL().then(imgUrl =>{
          setUrl(imgUrl);
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
            Url: url,
            pfpUrl: snapshot.profUrl,
            CookedScore: 0,
            CookedVal: 0,
            Cooked: 0,
            Date: firebase.firestore.Timestamp.now(),
            Comments: [],
          })
          navigation.navigate('RecipesList')
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
            <View style={{width: '100%', marginBottom: 20,}}>
              <TouchableOpacity style={styles.Submit} onPress={() => {onChooseImagePress()}}>
                <Text style={styles.SubmitText}>Upload Photo</Text>
              </TouchableOpacity>
              {finished ? <Text style={styles.successUpload}>Photo Uploaded</Text>: <></>}
              <TouchableOpacity style={styles.Submit} onPress={() => {createRecipe()}}>
                <Text style={styles.SubmitText}>Submit Recipe</Text>
              </TouchableOpacity>
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