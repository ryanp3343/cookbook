import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton, InputField } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

export default function ProfileScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
        <View style={styles.info}>
          <Text>Email={user.email}</Text>
        </View>
        <View style={styles.logOut}>
          <IconButton
            name='logout'
            size={24}
            color='#000000'
            onPress={handleSignOut}
          />
          <Text>Log out</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE7E0',
    paddingTop: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    marginBottom: 14
  },
  logOut: {
    width: 50,
    height: 50,
  }
});