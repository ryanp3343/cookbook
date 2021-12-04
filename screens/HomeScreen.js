import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ProfileStack from './ProfileStack';
import RecipeScreen from './RecipeScreen'
import ForumScreen  from './ForumScreen'
import RecipeStack from './RecipeStack';
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
                    tabBarActiveTintColor: '#fff',
                    tabBarActiveBackgroundColor: '#84a186',
                    tabBarInactiveBackgroundColor: '#3f5c41',
                    tabBarLabelStyle: {
                      fontSize: 15,
                      color: '#fff',
                    },
                    headerStyle: {
                      backgroundColor: '#3f5c41',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
                
    }}>
        <Tabs.Screen name="Forums" component={ForumScreen} options={{tabBarIcon: ({ tintColor }) => (
                <Icon name="forum" type='material' color='#fff'/>
            )}}/>
        <Tabs.Screen name="Recipes" component={RecipeStack} options={{tabBarIcon: ({ tintColor }) => (
                <Icon name="book" type='material' color='#fff'/>
            )}}/>
        <Tabs.Screen name="Profile" component={ProfileStack} options={{tabBarIcon: ({ tintColor }) => (
                <Icon name="person" type='material' color='#fff'/>
            ), headerRight: () => (
              <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
                height: StatusBar.currentHeight,
              }}>
              <Icon name="logout" type='material' color='#fff' onPress={() => handleSignOut() }/>
              </View>
            ), }}/>
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
