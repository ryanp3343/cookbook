import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import ForumCard from '../components/ForumCard';
import RecipeCard from '../components/RecipeCard';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

export default function ProfileScreen({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [followers, setFollowers] = useState(300)
  const [following, setfollowing] = useState(400)
  const [username, setUsername] = useState('Username')
  const [userClass, setUserClass] = useState('professional chef')
  const [display, setDisplay] = useState(true)


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

        <View  style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Image style={styles.Logo} source={require('../imgs/pfp1.jpg')}></Image>
            <View>
              <View style={styles.settingsName}>
                <Text style={styles.userName}>{username}</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('ProfileEditor')}>
                  <Icon name="edit" type='material' color='#000'/>
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

        <View style={styles.navContainer}>
          <View style={styles.profileNav}>
            <Pressable style={styles.button} onPress={() => setDisplay(true)}>
              <Text style={styles.buttonText}>FORUMS</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setDisplay(false)}>
              <Text style={styles.buttonText}>RECIPES</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView style={styles.Scroll}>
            {display ? <ForumCard name="Skinner" title="Cut my Finger!" repliesAmount={15}/> 
                     : <RecipeCard name={"Spaghetti"} url={'https://www.eatthis.com/wp-content/uploads/sites/4/2019/01/healthy-spaghetti-spicy-tomato-sauce.jpg?fit=1200%2C879&ssl=1'} directions={"odk"} ingredients={"odk"}/>}
          </ScrollView>
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
    width: 100,
    height: 100,
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