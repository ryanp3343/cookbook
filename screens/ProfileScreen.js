import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import ForumCard from '../components/ForumCard';
import RecipeCard from '../components/RecipeCard';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import LikedRecipeList from '../components/LikedRecipeList';

const auth = Firebase.auth();
const fireDB = Firebase.firestore();

export default function ProfileScreen({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [followers, setFollowers] = useState(0)
  const [following, setfollowing] = useState(0)
  const [display, setDisplay] = useState(true)
  const [loading, setLoading] = useState(true);
  const [userRef, setUserRef] = useState({});
  const [profile, setProfile] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [forumColor, setForumColor] = useState("black");
  const [recipeColor, setRecipeColor] = useState("black");
  const [likedColor, setLikedColor] = useState("#949D7E");
  
  const getUserRecipes = async () => {
    setLoading(true);
    console.log("getting User Recipes")
    const fireDB = Firebase.firestore();
    const ref = fireDB.collection('newrecipes');
    await auth.onAuthStateChanged(user => {
      if(user){
        fireDB.collection('newusers').doc(user.uid).get().then((docRef) =>{
          ref.onSnapshot((QuerySnapshot) => {
            const recipes = [];
            QuerySnapshot.forEach((doc) => {
              if(docRef.data()["userRecipes"].includes(doc.id)){
                let currentID = doc.id
                let appObj = { ...doc.data(), ['id']: currentID }
                recipes.push(appObj);
                // console.log(recipes)
              }
            });
            setUserRecipes(recipes)
            setLoading(false);
          })
        })
      }   
    }) 
  }

  const getSavedRecipes = async () => {
    setLoading(true);
    console.log("getting Saved Recipes")
    const fireDB = Firebase.firestore();
    const ref = fireDB.collection('newrecipes');
    await auth.onAuthStateChanged(user => {
      if(user){
        fireDB.collection('newusers').doc(user.uid).get().then((docRef) =>{
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
            setRecipes(recipes)
            setLoading(false);
          })
        })
      }   
    }) 
  }

  const chooseList = (number) => {
    if (number == 0) {
      setForumColor("#949D7E")
      setLikedColor("black")
      setRecipeColor("black")
      setDisplay(false)
    } else if (number == 1) {
      setForumColor("black")
      setLikedColor("black")
      setRecipeColor("#949D7E")
      setDisplay(true)
    } else if (number == 2) {
      setForumColor("black")
      setLikedColor("#949D7E")
      setRecipeColor("black")
      setDisplay(true)
    }
  }

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
            setfollowing(docRef.data().following)
            setFollowers(docRef.data().followers)
        })
      }   
    }) 
    await auth.onAuthStateChanged(user =>{
      fireDB.collection('newusers').doc(user.uid).get().then((docRef) =>{
        setUserRef(docRef.data());    
    })
    }) 
    
  }
var anotherurl = profile['profUrl']

  useEffect(() => {
    getProfile();
  },[]);

  useEffect(() => {
    getSavedRecipes();
  },[user]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile()
      getSavedRecipes();
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    getSavedRecipes();
    getUserRecipes();
  },[user]);


  return (
    <View style={styles.container}>
        <View  style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Image resizeMode='cover' style={styles.Logo} source={{uri: profile.profUrl}}></Image>
            <View>
              <View style={styles.settingsName}>
                <Text style={styles.userName}>{profile.username}</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('ProfileEditor', {
                  userData: userRef,
                })}>
                  <Icon name="edit" type='feather' color='#000'/>
                </Pressable>
              </View>
              <Text style={styles.userDescription}>{profile.profTitle}</Text>
              <View style={styles.profileFollowers}>
                <Text style={styles.followers}>followers: {followers?.length}</Text>
                <Text style={styles.followers}>following: {following?.length}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.navContainer}>
          <View style={styles.profileNav}>
            <Pressable style={styles.button} onPress={() => chooseList(0)}>
              <Text style={[styles.buttonText, {color: forumColor}]}>RECIPES</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => chooseList(2)}>
              <Text style={[styles.buttonText, {color: likedColor}]}>LIKED</Text>
            </Pressable>
          </View>
        </View>

        {!loading ? <View style={styles.contentContainer}>
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
                  pfpUrl={recipe.pfpUrl}
                /> ))}
              </ScrollView>
                      :
              <ScrollView style={styles.Scroll}  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              {userRecipes.map((recipe, index) => (
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
                  pfpUrl={recipe.pfpUrl}
                /> ))}
              </ScrollView>}
      
          </ScrollView>
        </View> : <></>}
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
    width: "80%",
    alignSelf: 'center'
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