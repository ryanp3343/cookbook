import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Image, ScrollView } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
import CommentCard from "../components/CommentCard"
// import { Button, InputField, ErrorMessage } from '../components';

export default function RecipeExpanded({navigation, route}) {
    const { name, directions, photoURL, ingredients, id } = route.params;
    return (
        <View style={styles.Container}>
            <Pressable onPress={() => navigation.navigate('RecipesList')}>
                <View style={styles.backButton}>
                    <Icon size={40} name="arrow-left" type='feather' color='#000'/>
                </View>
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}>
            <View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <ScrollView horizontal={true}>
                        <Image source={{uri: photoURL}}
                           style={{width: 320, height: 320, borderRadius: 15, marginBottom: 10, marginRight: 15}}
                        />
                        <Image source={{uri: photoURL}}
                           style={{width: 320, height: 320, borderRadius: 15, marginBottom: 10, marginRight: 15}}
                        />
                    </ScrollView>
                    <View style={styles.directionContainer}>
                        <Text style={styles.header}>Ingredients:</Text>
                        <Text style={styles.description}>{ingredients}</Text>
                    </View>
                    <View style={styles.ingredientContainer}>
                        <Text style={styles.header}>Directions:</Text>
                        <Text style={styles.description}>{directions}</Text>
                    </View>
                </View>
            </View>
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
    paddingBottom: 60,
    backgroundColor: '#fff'
  },
  backButton: {
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 30,
    marginVertical: 10,
},
text: {
    fontSize: 20,
    fontWeight: 'bold'
},
title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
},
description: {
    marginTop: 5,
    fontSize: 20,
},
descriptionContainer: {
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
  submitText: {
      fontSize: 16,
      color: '#3f5c41',
      fontWeight: 'bold'
  },
  Scroll: {
      marginTop: 10,
   },
   header: {
       fontSize: 20,
       fontWeight: 'bold',
   },
   ingredientContainer: {
        marginBottom: 10,
   },
   directionContainer: {
        marginBottom: 10,
   }
});