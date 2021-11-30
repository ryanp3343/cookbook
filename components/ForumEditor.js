import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
// import { Button, InputField, ErrorMessage } from '../components';

const createQuestion = (question, description) => {
  Firebase.firestore()
  .collection("Forums")
  .add({Question: question,
        Name: "DB SKINNER",
        Description: description,
        Replies: null
      }).then((data) => addComplete(data))
      .catch((error) => console.log(error));
}

export default function ForumEditor({navigation}) {
    
const [Question, setQuestion] = React.useState('');
const [Description, setDescription] = React.useState('');

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
                onChangeText={setQuestion}
                value={Question}
                placeholder="Question"
            />
            <TextInput 
                style={styles.Description}
                onChangeText={setDescription}
                value={Description}
                placeholder="Description"
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