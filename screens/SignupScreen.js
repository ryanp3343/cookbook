import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,Image, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import firebase from '../config/firebase';

class AddUser extends Component{
  constructor() {
    super();
    this.dbRef = firebase.firebase().colle
    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false
    };
  }
}



export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [signupError, setSignupError] = useState('');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '' && username !== '') {
        await auth().writeUserData(username,email,password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };
  return (
    <View style={styles.container}>
        <Image style={styles.Logo} source={require('../imgs/LOGO.png')} />
      <StatusBar style='dark-content' />
      <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#F9f6f6',
          marginBottom: 20
        }}
        placeholder='EMAIL'
        placeholderTextColor='BABC94'
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
          marginBottom: 20
        }}
        placeholder='USERNAME'
        placeholderTextColor='BABC94'
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='user-name'
        textContentType='userName'
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        placeholder='PASSWORD'
        placeholderTextColor='BABC94'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
    
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <View style={styles.buttonContainer}>
      <Button
        onPress={onHandleSignup}
        backgroundColor='#BABC94'
        title='REGISTER'
        titleSize={25}
      />
      </View>
      <View style = {styles.alternateButton}>
      <Button
        onPress={() => navigation.navigate('Login')}
        title='back to login'
        titleSize={13}
        backgroundColor='#EAE7E0'
        titleColor='A1A189'
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAE7E0',
        paddingTop: 150,
        paddingHorizontal: 60
      },
      Logo: {
        alignSelf:'center',
        width: 250,
        height: 250,
        paddingTop: 150
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