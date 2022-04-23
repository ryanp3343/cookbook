import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
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
                    tabBarStyle: { 
                      position: 'absolute',
                      elevation: 1,
                      backgroundColor: '#ffff',
                      height: 70, 
                    }, 
                    tabBarShowLabel: false,  
                    tabBarActiveTintColor: '#fff',
                    tabBarActiveBackgroundColor: '#fff',
                    headerStyle: {
                      backgroundColor: '#949D7E',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: "white",
    }}
     >
        <Tabs.Screen name="Forums" component={ForumScreen} options={{tabBarIcon: ({ focused }) => (
                <Icon name="message-square" type='feather' size={40} color={focused ? "#949D7E" : "#bbb"}/>
            ), headerRight: () => (
              <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
                height: StatusBar.currentHeight,
              }}>
              <Icon name="log-out" type='feather' color='#fff' onPress={() => handleSignOut() }/>
              </View>
            ), headerLeft: () => (
              <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
                height: StatusBar.currentHeight,
              }}>
                 <Image style={styles.stretch} source={require("../imgs/cooked_white.png")} size={40}></Image>
              </View>
            ),}}/>
        <Tabs.Screen name="Recipes" component={RecipeStack} options={{tabBarIcon: ({ focused }) => (
                <Icon name="book" type='feather' size={40} color={focused ? "#949D7E" : "#bbb"}/>
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
            ), headerLeft: () => (
              <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
                height: StatusBar.currentHeight,
              }}>
                 <Image style={styles.stretch} source={require("../imgs/cooked_white.png")} size={40}></Image>
              </View>
            ),}}/>
        <Tabs.Screen name="Profile" component={ProfileStack} options={{tabBarIcon: ({ focused }) => (
                <Icon name="user" type='feather' size={40} color={focused ? "#949D7E" : "#bbb"}/>
            ), headerRight: () => (
              <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
                height: StatusBar.currentHeight,
              }}>
              <Icon name="logout" type='material'  color='#fff' onPress={() => handleSignOut() }/>
              </View>
            ), headerLeft: () => (
              <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
                height: StatusBar.currentHeight,
              }}>
                 <Image style={styles.stretch} source={require("../imgs/cooked_white.png")} size={40}></Image>
              </View>
            ),}}/>
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
  },
  stretch: {
    width: 30,
    height: 23,
    resizeMode: 'stretch'
  }
});
