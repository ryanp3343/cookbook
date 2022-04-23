import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Firebase from '../config/firebase';
import firebase from 'firebase'
import { Rating } from 'react-native-ratings';
import 'firebase/firestore';


const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

const RecipeCard = ({name, directions, ingredients, url, recipe, id, userRef, cooked, cookedScore, cookedVal, username, date}) => {
    const [directionList, setDirectionList] = useState([]);
    const [liked, setLiked] = useState(false)
    const [score, setScore] = useState(0)
    const [datePrint, setDatePrint] = useState(0)
    const navigation = useNavigation();
    
    const db = Firebase.firestore()
    const auth = Firebase.auth();

    const saveRecipe = (id) => {
      auth.onAuthStateChanged(user =>{
      if(user){
        if(!liked){
          db.collection("newusers").doc(user.uid).update({ savedRecipes: arrayUnion(id) });
          setLiked(true)
        } else if(liked){
          db.collection("newusers").doc(user.uid).update({ savedRecipes: arrayRemove(id) });
          setLiked(false)
        }
      }})
    }

    const commentRecipe = async () => {
      await auth.onAuthStateChanged(user =>{
        if(user){
          if(!liked){
            db.collection("newusers").doc(user.uid).update({ savedRecipes: arrayUnion(id) });
            setLiked(true)
          } else if(liked){
            db.collection("newusers").doc(user.uid).update({ savedRecipes: arrayRemove(id) });
            setLiked(false)
          }
        }})
    }

    const cookedRecipe = async () => {
      await auth.onAuthStateChanged(user =>{
        if(user){
          let _cookedScore = cookedScore
          let _cookedVal = cookedVal
          let _cooked = cooked

          _cookedVal = _cookedVal + score
          _cooked = _cooked + 1
          _cookedScore = cookedVal / cooked
          
          db.collection("newusers").doc(user.uid).update(
            { 
              CookedScore: _cookedScore,
              CookedVal: _cookedVal,
              Cooked:  _cooked,
            });
        }})
    }

    const updateCard = async () => {
      var currentDate = new Date(date.seconds*1000).toLocaleDateString()
      setDatePrint(currentDate)
      let liked = userRef.savedRecipes
      for (let i in liked) {
        if (liked[i] == id) {
          return setLiked(true)
        } else {
          setLiked(false)
        }
      }
    }

    useEffect(() => {
      updateCard()
    }, [])

    return (
        <View style={styles.Card}>
          <Pressable onPress={() => navigation.navigate('RecipeExpanded', {
            name: recipe.Title,
            directions: recipe.Directions,
            photoURL: recipe.Url,
            ingredients: recipe.Ingredients,
            recipeid: recipe.id
          })}>
            <View style={styles.Title}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
            {/* This is all the profile information of postee */}
            <View style={styles.profileHeader}>
              <Image source={{uri: url}}
                         style={styles.profilePhoto}
              />
              <Text style={styles.username}>{username}</Text>
            </View>
          </Pressable>
              <BlurView intensity={120} tint="light" style={styles.Blur}>
                <Text style={styles.recipeTitle}>{name}</Text>
              </BlurView>
                <Image source={{uri: url}}
                       style={{width: "100%", height: 320}}
                 />
            </View>
          </Pressable>
            <View style={styles.buttonContainer}>
               {/* These are all the user interactions */}
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => saveRecipe(id)}>
                  <Icon style={styles.icon} size={40} color={liked ? '#949D7E' : '#000'} name="bookmark" type='feather'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => commentRecipe()}>
                  <Icon style={styles.icon} size={40} name="message-square" type='feather' color='#000'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => cookedRecipe()}>
                  <Image style={styles.stretch} source={require("../imgs/cooked.png")} size={40}></Image>
                </TouchableOpacity>
              </View>

              {/* This is the rating Component
              <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={25}
                  style={styles.rating}
                  onFinishRating={4}
                  defaultRating={5}
                  showRating={2}
                /> */}
            <View style={styles.rating}>
              <Text style={styles.ratingFont}>{cooked}</Text>
              <Text style={styles.ratingFontConstant}>/5</Text>
            </View>
            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>{datePrint}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  Card: {
    fontSize: 20,
    fontWeight: '600',
    width: '100%',
    height: 'auto',
    marginBottom: 20,
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 10,
  }, 
  profilePhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },  
  username: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  stretch: {
    marginTop: 2,
    width: 45,
    height: 35,
    resizeMode: 'stretch'
  },
  Blur: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  recipeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  Title: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  Logo: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  Description: {
    height:40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  TitleText: {
    fontSize: 20,
    color: '#4D4D3D',
    fontWeight: 'bold',
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: {
      marginRight: 25,
  },
  directionsContainer: {
      marginVertical: 10,
  },
  directions: {
      fontSize: 15,
  },
  directionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  date: {
    marginLeft: 10,
  },
  dateText: {
    fontSize: 15,
    color: '#aaa',
  },
  ratingFont: {
    fontSize: 30,
    color: "#FDCC0D"
  },
  ratingFontConstant: {
    fontSize: 20,
    color: "#FDCC0D"
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
    alignItems: 'center'
  },
});

export default RecipeCard;