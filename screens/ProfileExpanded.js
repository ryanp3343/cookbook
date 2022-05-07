import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import ForumCard from '../components/ForumCard';
import firebase from 'firebase';
import RecipeCard from '../components/RecipeCard';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import LikedRecipeList from '../components/LikedRecipeList';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
// import { Button, InputField, ErrorMessage } from '../components';

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

const placeHolder = "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"

const Recipe = ({ recipe, navigation, userRef }) => (
  <RecipeCard 
                key={recipe.id} 
                userRef={userRef} 
                id = {recipe.id} 
                recipe={recipe} 
                name={recipe.Title} 
                directions={recipe.directions} 
                url={recipe.Url} 
                vidurl={recipe.VidUrl}
                ingredients={recipe.ingredients}
                cookedScore={recipe.CookedScore}
                cookedVal={recipe.CookedVal}
                cooked={recipe.Cooked}
                username={recipe.Name}
                date={recipe.Date}
                pfpUrl={recipe.pfpUrl ? recipe.pfpUrl : placeHolder}
              />
);

const db = Firebase.firestore();
const auth = Firebase.auth();

export default function ProfileExpanded({navigation, route}) {
    const { id, uid } = route.params;
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
  const [selectedId, setSelectedId] = useState(null);
  
  const getUserRecipes = async () => {
    setLoading(true);
    console.log("getting User Recipes")
    const ref = db.collection('newrecipes');
    await auth.onAuthStateChanged(user => {
      if(user){
        db.collection('newusers').doc(uid).get().then((docRef) =>{
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
            setRecipes(recipes)
            setLoading(false);
          })
        })
      }   
    }) 
  }

  const followUser = (id) => {
    auth.onAuthStateChanged(user =>{
    if(user) {
      if(!follow){
        db.collection("newusers").doc(user.uid).update({ following: arrayUnion(id) });
        setFollow(true)
        setFollowers(followers + 1)
        db.collection("newusers").doc(id).update({ followers: arrayUnion(user.uid) });
      } else if(follow){
        db.collection("newusers").doc(user.uid).update({ following: arrayRemove(id) });
        db.collection("newusers").doc(id).update({ followers: arrayRemove(user.uid) });
        setFollow(false)
        setFollowers(followers - 1)
      }
    }})
  }

  const getProfile = async  () => {
    console.log("GETTING PROFILE===============================")
    console.log("getting profile")
    setLoading(true);
    await auth.onAuthStateChanged(user => {
      if(user){
        db.collection('newusers').doc(id).get().then((docRef) =>{
            db.collection('newusers').doc(user.uid).get().then((innerRef) =>{
               console.log(innerRef.data())
               console.log(docRef.data())
               setUserRef(innerRef.data());
               setProfile(docRef.data());
            })
            console.log("GETTING PROFILE DONE==========================")
        })
      }   
    }) 
  }

  const getFollowed = async  () => {
    setLoading(true);
    console.log("GETTING FOLLOWED===============================")
    console.log(profile)
    let tempArray = []
    await auth.onAuthStateChanged(user => {
      if(user){
        console.log("You " + userRef.username)
        console.log("following Size " + following.length)
        console.log("followers Size " + followers.length)
        tempArray = profile.following
        console.log("You are following " + userRef.following)
        console.log("check for " + id)
        console.log("Is following? " + tempArray.includes(id))
        if(userRef.following.includes(id)) {
          setFollow(true)
        }
        setfollowing(profile.following.length)
        setFollowers(profile.followers.length)
        console.log("DONE =========================================")
      }   
    }) 
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile()
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    getFollowed();
    getUserRecipes();
    setLoading(false)
  },[profile]);

  const renderItem = ({ item }) => {
    return (
      <Recipe
        recipe={item}
        navigation={navigation}
        userRef={userRef}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View>

        <View  style={styles.profileHeader}>
        {!loading ? <View style={styles.profileInfo}>
            <Image resizeMode='cover' style={styles.Logo} source={{uri: profile.profUrl}}></Image>
            <View>
              <View style={styles.settingsName}>
                <Text style={styles.userName}>{profile.username}</Text>
              </View>
              <Text style={styles.userDescription}>{profile.profTitle}</Text>
              <View style={styles.profileFollowers}>
                <Text style={styles.followers}>followers: {followers}</Text>
                <Text style={styles.followers}>following: {following}</Text>
              </View>
            </View> 
          </View> : <></> }
          {!loading ? <View style={styles.profileFollowers}>
              <TouchableOpacity style={styles.followButton} onPress={() => followUser(id)}>
                {follow ? <Text style={styles.followText}>unfollow</Text> : <Text style={styles.followText}>follow</Text> }
              </TouchableOpacity>
          </View> : <></>}
        </View>

        {!loading ? <View style={styles.contentContainer}>
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        </View> : <></>}
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
    marginBottom: 400,
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