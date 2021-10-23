import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,Image, Button as RNButton } from 'react-native';
// import { cond } from 'react-native-reanimated';
import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
//import firestore from '@react-native-firebase/firestore'

// class addUser extends Component {
//   constructor() {
//     super();
//     this.db = firebase.firestore().collection('users');
//     this.state = {
//       username: '',
//       email: '',
//     };
//   }
//   inputValue = (val,prop) =>{
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   }
//   storeUser() {
//     this.db.add({
//       username:this.state.username,
//       email:this.state.email
//     }).then((res) =>{
//       this.setState({
//         username: '',
//         email: ''
//       })
//     })
//   }
// }

const auth = Firebase.auth();

export default function SignupScreen({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };
    return (
    <View style={styles.container}>
        {<Image style={styles.Logo} source={require('../imgs/LOGO.png')} />}
      <StatusBar style='dark-content' />
      <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#F9f6f6',
          marginBottom: 20
        }}
        placeholder='USERNAME'
        placeholderTextColor='#BABC94'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
      />
      <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#F9f6f6',
          marginBottom: 20
        }}
        placeholder='EMAIL'
        placeholderTextColor='#BABC94'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
        {/* <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        placeholder='USERNAME'
        placeholderTextColor='#BABC94'
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='user-name'
        textContentType='userName'
        value={this}
        onChangeText={text => this.inputValue(val,'username')}
      /> */}
      <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        placeholder='PASSWORD'
        placeholderTextColor='#BABC94'
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
        titleColor='#A1A189'
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