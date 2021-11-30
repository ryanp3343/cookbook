import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
// import { Button, InputField, ErrorMessage } from '../components';

const createRecipe = (question) => {
  Firebase.firestore()
  .collection("Forums")
  .add({Question: question,
        Name: "DB SKINNER",
        Replies: 60
      }).then((data) => addComplete(data))
      .catch((error) => console.log(error));
}

export default function RecipeEditor({navigation}) {
    
const [Recipe, setRecipe] = React.useState('');
const [Ingredients, setIngredients] = React.useState('');
const [Directions, setDirections] = React.useState('');

    return (
      <View style={styles.backgroundImage}>
          <View style={styles.HeaderContainer}>
            <Text style={styles.Header}>Recipe Creator</Text>
                <Pressable onPress={() => navigation.navigate('RecipesList')}>
                    <View style={styles.backButton}>
                    <Icon size={40} name="arrow-left" type='material' color='#000'/>
                    <Text style={styles.text}>Exit</Text>
                    </View>
                </Pressable>
          </View>
          <View style={styles.inputContaier}>
            <TextInput 
                style={styles.Recipe}
                onChangeText={setRecipe}
                value={Recipe}
                placeholder="Recipe Title"
            />
            <TextInput 
                style={styles.Ingredients}
                onChangeText={setIngredients}
                value={Ingredients}
                placeholder="Ingredients"
                multiline={true}
                numberOfLines={3}
                require={true}
            />
            <TextInput 
                style={styles.Directions}
                onChangeText={setDirections}
                value={Directions}
                placeholder="Directions"
                multiline={true}
                numberOfLines={3}
                require={true}
            />
          </View>
         <View style={styles.Submit}>
             <Button
                onPress={() => {createRecipe(Recipe)}}
                title="Submit Recipe"
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
  Recipe: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  Ingredients: {
    height: 200,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 10,
    textAlign: 'left',
  },
  Directions: {
    height: 200,
    width: 300,
    margin: 12,
    borderWidth: 1,
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