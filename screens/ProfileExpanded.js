import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import ForumCard from '../components/ForumCard';
import RecipeCard from '../components/RecipeCard';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import LikedRecipeList from '../components/LikedRecipeList';
import { TouchableOpacity } from 'react-native-gesture-handler';

const auth = Firebase.auth();
const fireDB = Firebase.firestore();

export default function ProfileExpanded({navigation, route}) {
    const { id } = route.params;
  const { user } = useContext(AuthenticatedUserContext);
  const [followers, setFollowers] = useState(0)
  const [following, setfollowing] = useState(0)
  const [username, setUsername] = useState('Username')
  const [userClass, setUserClass] = useState('professional chef')
  const [follow, setFollow] = useState(false)
  const [display, setDisplay] = useState(true)
  const [loading, setLoading] = useState(false);
  const [userRef, setUserRef] = useState({});
  const [profile, setProfile] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  const getSavedRecipes = async () => {
    const fireDB = Firebase.firestore();
    const ref = fireDB.collection('newrecipes');
    await auth.onAuthStateChanged(user => {
      if(user){
        fireDB.collection('newusers').doc(id).get().then((docRef) =>{
          ref.onSnapshot((QuerySnapshot) => {
            const recipes = [];
            QuerySnapshot.forEach((doc) => {
              if(docRef.data()["savedRecipes"].includes(doc.id)){
                let currentID = doc.id
                let appObj = { ...doc.data(), ['id']: currentID }
                recipes.push(appObj);
                // console.log(recipes)
              }
            });
            console.log(recipes)
            setRecipes(recipes)
          })
        })
      }   
    }) 
  }

  const followUser = async () => {
    const fireDB = Firebase.firestore();
    const ref = fireDB.collection('newrecipes');
    await auth.onAuthStateChanged(user => {
      if(user){
      }   
    }) 
  }

  const getProfile = async  () => {
    setLoading(true);
    await auth.onAuthStateChanged(user => {
      if(user){
        fireDB.collection('newusers').doc(id).get().then((docRef) =>{
            const profile = [];
            console.log(docRef.data())
           // profile.push(docRef.data())
            setProfile(docRef.data());
            
        })
      }   
    }) 
    await auth.onAuthStateChanged(user =>{
      fireDB.collection('newusers').doc(id).get().then((docRef) =>{
        setUserRef(docRef.data());    
    })
    }) 
  }

  useEffect(() => {
    getProfile();
  },[]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile()
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    getSavedRecipes();
  },[]);


  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />

        <View  style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Image resizeMode='cover' style={styles.Logo} source={{uri: profile.profUrl}}></Image>
            <View>
              <View style={styles.settingsName}>
                <Text style={styles.userName}>{profile.profUsername}</Text>
              </View>
              <Text style={styles.userDescription}>{profile.profTitle}</Text>
              <View style={styles.profileFollowers}>
                <Text style={styles.followers}>followers: {followers}</Text>
                <Text style={styles.followers}>following: {following}</Text>
              </View>
            </View>
          </View>
          <View style={styles.profileFollowers}>
              <TouchableOpacity style={styles.followButton} onPress={() => {setFollow(!follow)}}>
                <Text style={styles.followText}>{follow ? "unfollow" : "follow"}</Text>
              </TouchableOpacity>
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
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView style={styles.Scroll}>
            {display ?
              <ScrollView style={styles.Scroll}  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              {recipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  userRef={userRef} 
                  id = {recipe.id} 
                  recipe={recipe} 
                  name={recipe.Title} 
                  directions={recipe.directions} 
                  url={recipe.Url} 
                  ingredients={recipe.ingredients}
                  cookedScore={recipe.CookedScore}
                  cookedVal={recipe.CookedVal}
                  cooked={recipe.Cooked}
                  username={recipe.Name}
                  date={recipe.Date}
                /> ))}
              </ScrollView>
                      :<ForumCard key={"index"} name={"poppmane"} title={"How to boil water?"}/>}
            {/* {display ? <RecipeCard name={"Homade Doughnuts"} directions={"som"} ingredients={"som"} url={'https://firebasestorage.googleapis.com/v0/b/test2-7ed41.appspot.com/o/images%2FftXCcuNEJwUFx26SOd1JZWmmZ1Q2%2Frecipe.png?alt=media&token=c242e56d-9fa4-4d96-8997-568e56501691'}/> 
            : <ForumCard key={"index"} name={"poppmane"} title={"How to boil water?"}/>} */}
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
  followButton: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  followText: {
    fontSize: 15,
    color: '#fff'
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