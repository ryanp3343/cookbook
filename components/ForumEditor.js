import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

const db = Firebase.firestore()
const auth = Firebase.auth();


export default function ForumEditor({navigation}) {
    
const [Question, setQuestion] = useState('');
const [Description, setDescription] = useState('');
const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Breakfast', value: 'Breakfast'},
    {label: 'Lunch', value: 'Lunch'},
    {label: 'Dinner', value: 'Dinner'},
    {label: 'Desert', value: 'Desert'},
    {label: 'Snack', value: 'Snack'},
    {label: 'Drink', value: 'Drink'},
    {label: 'Other', value: 'Other'}
  ]);

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
                Replies: null,
                Tag: value,
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
            <Pressable onPress={() => navigation.navigate('List')}>
              <View style={styles.backButton}>
                <Icon size={40} name="arrow-left" type='feather' color='#000'/>
              </View>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.inputContaier}>
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
                textAlignVertical={'top'}
            />
            <DropDownPicker
              placeholder='Select Type'
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            <View style={styles.Submit}>
             <Button
                onPress={() => {createQuestion(Question, Description)}}
                title="Submit Question"
                color="#949D7E"
                accessibilityLabel="Learn more about this purple button"
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
  backButton: {
    flexDirection:'row',
    justifyContent: 'flex-start',
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
    width: '100%',
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  Description: {
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
    marginTop: 20,
    width: '60%',
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