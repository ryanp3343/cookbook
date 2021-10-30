import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import EventCard from '../components/EventCard';

export default function ProfileScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileName}>
          <Text style={styles.title}>@Poppmane</Text>
          <Icon name="notifications-outline" type='ionicon' color='black'/>
          <Icon name="menu-outline" type='ionicon' color='black'/>
        </View>
        <View style={styles.profileButtons}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.friend}>Add Friend</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.friend}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.componentContainer}>
        <View style={styles.compHeader}>
          <Text style={styles.title}>Your Events</Text>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        <EventCard />
        <EventCard />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 60,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 250,
  },
  scroll: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileName: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileContainer: {
    marginBottom: 60,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  profileButtons: {
    flexDirection: 'row',
  },
  compHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    width: 100,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 15
  },
  friend: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color:  'black',
  },

  buttonCreate: {
    borderRadius: 8,
    width: 120,
    alignItems: 'center',
    paddingVertical: 7,
    borderColor:  'black',
    borderWidth: 2,
    backgroundColor: 'lightgrey',
  },
  createText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color:  'black',
  },
});