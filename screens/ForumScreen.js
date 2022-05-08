import { StatusBar } from 'expo-status-bar';
import React, { useContext} from 'react';
import { StyleSheet } from 'react-native';
import ForumEditor from '../components/ForumEditor';
import Firebase from '../config/firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ForumList from '../components/ForumList';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import ForumExpanded from '../components/ForumExpanded';
import ProfileExpanded from './ProfileExpanded';

const auth = Firebase.auth();
const Stack = createStackNavigator();

export default function ForumScreen() {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='List' component={ForumList} />
      <Stack.Screen name='Editor' component={ForumEditor} />
      <Stack.Screen name='ForumExpand' component={ForumExpanded} />
      <Stack.Screen name='ProfileExpanded' component={ProfileExpanded} />
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