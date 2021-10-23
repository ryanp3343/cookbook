import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ProfileScreen from './ProfileScreen'
import RecipeScreen from './RecipeScreen'
import ForumScreen  from './ForumScreen'
import { Icon } from 'react-native-elements/dist/icons/Icon';

const auth = Firebase.auth();
const Tabs = createBottomTabNavigator();


export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tabs.Navigator screenOptions={{
                    tabBarStyle: { position: 'absolute' },
                    tabBarActiveTintColor: '#4D4D3D',
                    tabBarActiveBackgroundColor: '#4D4D3D',
                    tabBarInactiveBackgroundColor: '#BABC94',
                    tabBarLabelStyle: {
                      fontSize: 15,
                      color: '#EAE7E0',
                    },
    }}>
        <Tabs.Screen name="Forums" component={ForumScreen} options={{tabBarIcon: ({ tintColor }) => (
                <Icon name="chat" type='entypo' color='#EAE7E0'/>
            )}}/>
        <Tabs.Screen name="Recipes" component={RecipeScreen} options={{tabBarIcon: ({ tintColor }) => (
                <Icon name="book" type='entypo' color='#EAE7E0'/>
            )}}/>
        <Tabs.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: ({ tintColor }) => (
                <Icon name="user" type='entypo' color='#EAE7E0'/>
            )}}/>
      </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE7E0',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  }
});
