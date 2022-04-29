import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,Image, Button as RNButton, KeyboardAvoidingView, Platform } from 'react-native';
// import { cond } from 'react-native-reanimated';
import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();
const db = Firebase.firestore()

export default function SignupScreen({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUser] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password).then((cred) =>{
          var user = auth.currentUser;
          var uid;
          if(user != null)
          {
              uid = user.uid;
          }
          console.log(uid)
          db.collection("newusers").doc(uid)
          .set({
            username: username,
            email: email,
            password: password,
            profUrl: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
            profTitle: 'sous chef',
            savedRecipes: [],
            userRecipes: [],
            userForums: [],
            following: [],
            followers: [],
          })
        })
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };
    return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
      >
        <View style={styles.container}>
            {<Image style={styles.Logo} source={require('../imgs/LOGO_BLACK.png')} />}
          <StatusBar style='dark-content' />
          <InputField
            inputStyle={{
              fontSize: 20
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              marginBottom: 20,
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              borderRadius: 0,
            }}
            placeholder='USERNAME'
            placeholderTextColor='#bbb'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            value={username}
            onChangeText={text => setUser(text)}
          />
          <InputField
            inputStyle={{
              fontSize: 20
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              marginBottom: 20,
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              borderRadius: 0,
            }}
            placeholder='EMAIL'
            placeholderTextColor='#bbb'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <InputField
            inputStyle={{
              fontSize: 20
            }}
            containerStyle={{
              backgroundColor: '#fff',
              marginBottom: 20,
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              borderRadius: 0,
            }}
            placeholder='PASSWORD'
            placeholderTextColor='#bbb'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            value={password}
            onChangeText={text => setPassword(text)}
            //handlePasswordVisibility={handlePasswordVisibility}
          />

          {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
          <View style={styles.buttonContainer}>
          <Button
            onPress={onHandleSignup}
            backgroundColor='#000'
            title='REGISTER'
            titleSize={25}
          />
          </View>
          <View style = {styles.alternateButton}>
          <Button
            onPress={() => navigation.navigate('Login')}
            title='back to login'
            titleSize={13}
            backgroundColor='transparent'
            titleColor='#555'
          />
          </View>
        </View>
    </KeyboardAvoidingView>
    );
      }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 60,
        justifyContent:'center'
      },
      Logo: {
        alignSelf:'center',
        width: 250,
        height: 250,
        paddingTop: 150,
        marginBottom: 20
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
});