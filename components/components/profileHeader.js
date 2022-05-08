import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import ForumCard from '../components/ForumCard';

import { IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

export default function profileHeader({username, userClass, followers, following}) {
  const { user } = useContext(AuthenticatedUserContext);
  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />

        <View  style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Image style={styles.Logo} source={require('../imgs/pfp1.jpg')}></Image>
            <View>
              <View style={styles.settingsName}>
                <Text style={styles.userName}>{username}</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
                  <Icon name="edit" type='entypo' color='#000'/>
                </Pressable>
              </View>
              <Text style={styles.userDescription}>{userClass}</Text>
              <View style={styles.profileFollowers}>
                <Text style={styles.followers}>followers: {followers}</Text>
                <Text style={styles.followers}>following: {following}</Text>
              </View>
            </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 8,
  },
  profileHeader: {
    flexDirection: 'column'
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingsName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#bbb',
  },
  Logo: {
    marginRight: 10,
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileFollowers: {
    marginTop: 10,
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
  },
  info: {
    marginBottom: 14
  },
  logOut: {
    width: 50,
    height: 50,
  },
  navContainer: {
    height: 'auto',
    paddingTop: 15,
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 250
  },
  profileNav: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    width: 300,
  },
  button: {
    marginTop: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});