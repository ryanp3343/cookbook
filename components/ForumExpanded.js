import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, ScrollView } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
import CommentCard from "../components/CommentCard"
// import { Button, InputField, ErrorMessage } from '../components';

export default function ForumExpanded({navigation, route}) {
    const [Comment, setComment] = React.useState('');
    const { name, title, repliesAmount, description } = route.params;
    return (
      <View style={styles.Container}>
      
           <Pressable onPress={() => navigation.navigate('List')}>
                <View style={styles.backButton}>
                    <Icon size={40} name="arrow-left" type='material' color='#000'/>
                    <Text style={styles.text}>Back</Text>
                </View>
            </Pressable>

            <View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.replies}>Replies:</Text>
            </View>

            <TextInput 
                style={styles.Coment}
                onChangeText={setComment}
                value={Comment}
                placeholder="Add a comment"
                multiline={true}
                numberOfLines={3}
                require={true}
            />

            <View style={styles.submit}>
                <Pressable  onPress={() => alert("hello")}>
                    <Text style={styles.submitText}>Comment</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.Scroll}>
                <CommentCard name={"Joe Mama"} comment={"just dont eat them!"}/>
                <CommentCard name={"Joe Mama"} comment={"just dont eat them!"}/>
                <CommentCard name={"Joe Mama"} comment={"just dont eat them!"}/>
                <CommentCard name={"Joe Mama"} comment={"just dont eat them!"}/>
            </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    Container: {
    flex : 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingBottom: 60
  },
  backButton: {
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 30
},
text: {
    fontSize: 20,
    fontWeight: 'bold'
},
title: {
    fontSize: 25,
    fontWeight: 'bold',
},
description: {
    marginTop: 10,
    fontSize: 20,
},
descriptionContainer: {
    // borderWidth: 1,
    paddingHorizontal:10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
},
replies: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
},
Coment: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  submit: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#3f5c41',
      borderWidth: 2,
      width: 100,
      height: 30,
      borderRadius: 8,
  },
  submitText: {
      fontSize: 16,
      color: '#3f5c41',
      fontWeight: 'bold'
  },
  Scroll: {
    marginTop: 10,
   },
});