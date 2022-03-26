import { StatusBar } from 'expo-status-bar';
import React, { useContext} from 'react';
import { StyleSheet } from 'react-native';
import ForumEditor from '../components/ForumEditor';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ForumList from '../components/ForumList';
import RecipeScreen from './RecipeScreen';
import RecipeEditor from '../components/RecipeEditor';
import RecipeExpanded from '../components/RecipeExpanded';

const Stack = createStackNavigator();

export default function RecipeStack() {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='RecipesList' component={RecipeScreen} />
      <Stack.Screen name='RecipeEditor' component={RecipeEditor} />
      <Stack.Screen name='RecipeExpanded' component={RecipeExpanded} />
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