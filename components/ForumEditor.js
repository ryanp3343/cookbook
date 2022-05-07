import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

const db = Firebase.firestore()
const auth = Firebase.auth();


export default function ForumEditor({navigation}) {
    
const [Question, setQuestion] = useState('');
const [Description, setDescription] = useState('');
const [open, setOpen] = useState(false);
const [height, setHeight] = useState(40);  
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
          const ref = db.collection('newforums').doc();
          const id = ref.id;
          ref.set({
                Question: Question,
                Description: Description,
                Name: snapshot.username,
                Replies: null,
                Tag: value,
                ProfUrl: snapshot.profUrl,
                Uid: user.uid,
              }).then((data) => {
                console.log("========================================================")
                console.log(id)
                db.collection("newusers").doc(user.uid).update({ userForums: arrayUnion(id) });            
                navigation.navigate("List")
              })
      })
    }
  })
};

const updateSize = (height) => {
  setHeight(height)
}

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
                numberOfLines={1}
                onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
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
            <View style={{width: '100%', marginBottom: 20,}}>
              <TouchableOpacity style={styles.Submit} onPress={() => {createQuestion()}}>
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
    height: 'auto',
    marginVertical: 12,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 25,
  },
  Description: {
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 20,
  },
  inputContaier: {
    paddingHorizontal: 20,
  },
  Submit: {
    marginVertical: 30,
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