import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';

const db = Firebase.firestore()
const auth = Firebase.auth();


export default function ForumEditor({navigation}) {
    
const [Question, setQuestion] = useState('');
const [Description, setDescription] = useState('');

const createQuestion = async () => {
  var userName
  await auth.onAuthStateChanged(user =>{
    if(user){
      db.collection("newusers").doc(user.uid).get().then((docRef) => {
        const snapshot = docRef.data();
        userName = snapshot["username"];
        Firebase.firestore()
          .collection("newforums")
          .add({Question: Question,
                Description: Description,
                Name: userName,
                Replies: null
              }).then((data) => {
                console.log("here")
                console.log(data)                    
              })
                .catch((error) => console.log(error));
      })
    }
  })

};

    return (
      <View style={styles.backgroundImage}>
          <View style={styles.HeaderContainer}>
            <Text style={styles.Header}>Forum Creator</Text>
                <Pressable onPress={() => navigation.navigate('List')}>
                    <View style={styles.backButton}>
                    <Icon size={40} name="arrow-left" type='material' color='#000'/>
                    <Text style={styles.text}>Exit</Text>
                    </View>
                </Pressable>
          </View>
          <View style={styles.inputContaier}>
            <TextInput 
                style={styles.Question}
                onChangeText={text => setQuestion(text)}
                value={Question}
                placeholder="Question"
                maxLength = {40}
            />
            <TextInput 
                style={styles.Description}
                onChangeText={text => setDescription(text)}
                value={Description}
                placeholder="Description"
                maxLength = {300}
                multiline={true}
                numberOfLines={3}
                require={true}
            />
          </View>
         <View style={styles.Submit}>
             <Button
                onPress={() => {createQuestion(Question, Description)}}
                title="Submit Question"
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