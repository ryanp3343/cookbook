import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import ForumCard from '../components/ForumCard';
import RecipeCard from '../components/RecipeCard';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();
const fireDB = Firebase.firestore();

export default function ProfileScreen({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [followers, setFollowers] = useState(0)
  const [following, setfollowing] = useState(0)
  const [username, setUsername] = useState('Username')
  const [userClass, setUserClass] = useState('professional chef')
  const [display, setDisplay] = useState(true)
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  const getProfile = async  () => {
    setLoading(true);
    await auth.onAuthStateChanged(user => {
      if(user){
        fireDB.collection('newusers').doc(user.uid).get().then((docRef) =>{
            const profile = [];
           // profile.push(docRef.data())
            setProfile(docRef.data());
            
        })
      }   
    })  
    
  }
var anotherurl = profile['profUrl']

  useEffect(() => {
    getProfile();
  },[]);
  


  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />

        <View  style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Image resizeMode='cover' style={styles.Logo} source={{uri: anotherurl}}></Image>
            <View>
              <View style={styles.settingsName}>
                <Text style={styles.userName}>{profile['username']}</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('ProfileEditor')}>
                  <Icon name="edit" type='feather' color='#000'/>
                </Pressable>
              </View>
              <Text style={styles.userDescription}>{profile['profTitle']}</Text>
              <View style={styles.profileFollowers}>
                <Text style={styles.followers}>followers: {followers}</Text>
                <Text style={styles.followers}>following: {following}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.navContainer}>
          <View style={styles.profileNav}>
            <Pressable style={styles.button} onPress={() => setDisplay(false)}>
              <Text style={styles.buttonText}>FORUMS</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setDisplay(true)}>
              <Text style={styles.buttonText}>RECIPES</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setDisplay(true)}>
              <Text style={styles.buttonText}>LIKED</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView style={styles.Scroll}>
            {display ? <RecipeCard name={"Homade Doughnuts"} directions={"som"} ingredients={"som"} url={'https://firebasestorage.googleapis.com/v0/b/test2-7ed41.appspot.com/o/images%2FftXCcuNEJwUFx26SOd1JZWmmZ1Q2%2Frecipe.png?alt=media&token=c242e56d-9fa4-4d96-8997-568e56501691'}/> 
                      : <ForumCard key={"index"} name={"poppmane"} title={"How to boil water?"}/>}
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
    flexDirection: 'column',
  },
  profileHeader: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#D8d8d8',
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
  contentContainer: {
    // alignItems: 'center',
    marginBottom: 250,
    width: '100%',
  },
  profileNav: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    width: "100%",
  },
  button: {
    marginTop: 5,
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});