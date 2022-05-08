import { StatusBar } from 'expo-status-bar';
import React, { useContext} from 'react';
import { StyleSheet } from 'react-native';
import ForumEditor from '../components/ForumEditor';
import Firebase from '../config/firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ForumList from '../components/ForumList';
import RecipeScreen from './RecipeScreen';
import RecipeEditor from '../components/RecipeEditor';
import ProfileScreen from './ProfileScreen';
import ProfileEditor from '../components/ProfileEditor';
import ProfileExpanded from './ProfileExpanded';
import TutorialScreen from '../components/TutorialScreen';

const auth = Firebase.auth();
const Stack = createStackNavigator();

export default function ProfileStack() {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='ProfileEditor' component={ProfileEditor} />
      <Stack.Screen name='Tutorial' component={TutorialScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 60
  },
   Scroll: {
    marginTop: 10,
   },
   input: {
    backgroundColor: '#fff',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
});