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

const RecipeCard = ({name, directions, ingredients, url, recipe, id}) => {
    const [directionList, setDirectionList] = useState([]);
    const [liked, setLiked] = useState(false)
    const navigation = useNavigation();
    
    const db = Firebase.firestore()
    const auth = Firebase.auth();

    const saveRecipe = (id) => {
      auth.onAuthStateChanged(user =>{
      if(user){
        // console.log("=================", id)
        console.log(user.uid)
        if(!liked){
          console.log("=================added to saved", id)
          db.collection("newusers").doc(user.uid).update({ savedRecipes: arrayUnion(id) });
          setLiked(true)
        } else if(liked){
          console.log("=================removed from saved", id)
          db.collection("newusers").doc(user.uid).update({ savedRecipes: arrayRemove(id) });
          setLiked(false)
        }
      }})
    }

    const commentRecipe = () => {
      navigation.navigate('RecipeExpanded', {
        name: recipe.Title,
        directions: recipe.Directions,
        photoURL: recipe.Url,
        ingredients: recipe.Ingredients,
        recipeid: recipe.id
      })
      console.log(recipe.id)
    }

    const visitProfile = () => {
      alert("you visited user for " + recipe.Title)
    }

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
              <Image source={{uri: 'https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg'}}
                         style={styles.profilePhoto}
              />
              <Text style={styles.username}>{"Poppmane"}</Text>
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
                <TouchableOpacity onPress={() => visitProfile()}>
                  <Image style={styles.stretch} source={require("../imgs/cooked.png")} size={40}></Image>
                </TouchableOpacity>
              </View>

              {/* This is the rating Component */}
              <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={25}
                  style={styles.rating}
                  onFinishRating={3}
                  defaultRating={0}
                />

            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>{'12/12/12'}</Text>
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
  rating: {
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
    fontSize: 20,
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
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#949D7E',
    marginBottom: 10,
    borderWidth: 2,
    width: 100,
    borderRadius: 5,
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
  }
});

export default RecipeCard;