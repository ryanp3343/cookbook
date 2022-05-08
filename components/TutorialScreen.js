import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, View,Image, Text, Pressable} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';


const auth = Firebase.auth();
const db = Firebase.firestore()

export default function TutorialScreen({ navigation }) {


    
      return (
      <ScrollView contentContainerStyle ={styles.scrollView}>
        <View style={styles.HeaderContainer}>
            <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
              <View style={styles.backButton}>
                <Icon size={40} name="arrow-left" type='feather' color='#000'/>
              </View>
            </Pressable>
          </View>
          <View style={styles.container}>
          {<Image style={styles.Logo} source={require('../imgs/LOGO_BLACK.png')} />}
          
          
          <Icon name="plus-square" type='feather' size={50} />
            <Text>
               
            Clicking this icon in the Forum page will allow you to create forum post and clicking it in the Recipe page will allow you to make a recipe post

            </Text>
            <Icon name="book" type='feather' size={50}/>
            <Text>
            Clicking this icon will bring you to Recipes page.
            </Text>
            <Icon name="user" type='feather' size={50} />
            <Text>
            Clicking this icon will bring you to the Profile page.
            </Text>
            <Icon name="message-square" type='feather' size={50} />
            <Text>
            Click this icon will allow you to leave a comment.
            </Text>
            <Image style={styles.stretch} source={require('../imgs/cooked.png')}></Image>
            <Text>
            Clicking this icon will allow you to rate a recipe.
            </Text>
            <Icon name="logout" type='material'   size={50} />
        <StatusBar style='dark-content' />
            <Text>
              Clicking this icon will log you out.
            </Text>

          </View>
      </ScrollView>
      );
        }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 60,
          justifyContent:'center',
          paddingBottom: 100,
        },
        Logo: {
          alignSelf:'center',
          width: 250,
          height: 250,
            marginBottom: 10

        },
   
        buttonContainer: {
            margin:2,
            paddingHorizontal:30
            
        },
        alternateButton: {
          margin: 5,
          paddingHorizontal:50,
          color: "white"
        },
        stretch: {
            alignSelf:'center',
            width: 60,
            height: 46,
            resizeMode: 'stretch'
          },
          HeaderContainer: {
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            paddingTop: 10,
          },
          backButton: {
            flexDirection:'row',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30
        },
  });