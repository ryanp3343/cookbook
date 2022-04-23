import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, View,Image} from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';



const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      {<Image style={styles.Logo} source={require('../imgs/LOGO_BLACK.png')} />}
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
          backgroundColor: 'transparent',
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
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <View style={styles.buttonContainer}>
      <Button
        onPress={onLogin}
        backgroundColor='#000'
        title='LOGIN'
        titleSize={25}
      />
      </View>
      <View style = {styles.alternateButton}>
      <Button
        onPress={() => navigation.navigate('Signup')}
        title={`Don't have an account? Sign up`}
        titleSize={13}
        backgroundColor='transparent'
        titleColor='#000'
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 60,
    justifyContent: 'center'
  },
  Logo: {
    alignSelf:'center',
    width: 250,
    height: 250,
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