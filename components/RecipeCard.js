import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Modal,  } from 'react-native';
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

const RecipeCard = ({pfpUrl, uid, name, vidurl, directions, ingredients, url, recipe, id, userRef, cooked, cookedScore, cookedVal, username, date}) => {
    const [directionList, setDirectionList] = useState([]);
    const [liked, setLiked] = useState(false)
    const [userScore, setUserScore] = useState(0)
    const [score, setScore] = useState(0)
    const [datePrint, setDatePrint] = useState(0)
    const [showCooked, setShowCooked] = useState(false)
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
      navigation.navigate('RecipeExpanded', {
        name: recipe.Title,
        directions: recipe.Directions,
        photoURL: recipe.Url,
        vidurl: vidurl,
        ingredients: recipe.Ingredients,
        recipeid: recipe.id
      })
      console.log(recipe.id)
    }

    const cookedRecipe = async () => {
      await auth.onAuthStateChanged(user =>{
        if(user){
          let _cookedScore = cookedScore
          let _cookedVal = cookedVal
          let _cooked = cooked

          console.log("csN " + cookedScore)
          console.log("cvN " + cookedVal)
          console.log("cN " +cooked)

          console.log("cs " + _cookedScore)
          console.log("cv " + _cookedVal)
          console.log("c " +_cooked)
          let us =  parseInt(userScore)
          console.log("userscore " + us)

          _cookedVal = _cookedVal + us
          _cooked = _cooked + 1
          _cookedScore = _cookedVal / _cooked
          setScore(_cookedScore.toFixed(2))

          db.collection("newrecipes").doc(id).update(
            { 
              CookedScore: _cookedScore,
              CookedVal: _cookedVal,
              Cooked:  _cooked,
            });
        }})
        setUserScore(0)
        setShowCooked(false)
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
      setScore(cookedScore)
    }, [])

    return (
        <View style={styles.Card}>
            <View style={styles.Title}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
            {/* This is all the profile information of postee */}
            <Pressable onPress={() => navigation.navigate('RecipeExpanded', {
            name: recipe.Title,
            directions: recipe.Directions,
            photoURL: recipe.Url,
            ingredients: recipe.Ingredients,
            recipeid: recipe.id,
            vidurl: vidurl,
          })}>
            <Text style={styles.recipeTitle}>{name}</Text>
            </Pressable>
            </Pressable>
            <View>
              <Image resizeMode='cover' source={{uri: url}}
                          style={{          
                            height: 300,
                            flex: 1,
                            width: null,}}
                      />
            </View>
            <View style={styles.profileHeader}>
            <Pressable style={styles.profileHeaderPress} onPress={() => navigation.navigate("ProfileExpanded", {
            id: uid
            })}>
                  <Image source={{uri: pfpUrl}}
                    style={styles.profilePhoto}
                  />
                  <Text style={styles.username}>{username}</Text>
                  </Pressable>
                </View>
            </View>
            <View style={styles.buttonContainer}>
               {/* These are all the user interactions */}
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => saveRecipe(id)}>
                  <Icon style={styles.icon} size={30} color={liked ? '#949D7E' : '#000'} name="bookmark" type='feather'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => commentRecipe()}>
                  <Icon style={styles.icon} size={30} name="message-square" type='feather' color='#000'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowCooked(!showCooked)}>
                  <Image style={styles.stretch} source={require("../imgs/cooked.png")} size={20}></Image>
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
              <Text style={styles.ratingFont}>{score}</Text>
              <Text style={styles.ratingFontConstant}>/5</Text>
            </View>
            </View>
            {showCooked ? 
              <View style={styles.scoreContainer}>
                <Text>Give it a rating:</Text>
                <TextInput 
                  style={styles.scoreInput}
                  onChangeText={text => setUserScore(text)}
                  value={userScore}
                  placeholder="Score"
                  maxLength = {2}
                  multiline={false}
                  numberOfLines={1}
                  textAlignVertical={'top'}
                />
                <TouchableOpacity style={styles.submitBox} onPress={() => cookedRecipe()}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </View> : <></>}
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
    paddingVertical: 5,
    paddingLeft: 10,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fffa',
    borderTopLeftRadius: 10,
    padding: 10,
    bottom: 0,
    right: 0,
  }, 
  profileHeaderPress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  profilePhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },  
  scoreContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    width: 150,
    padding: 5,
    borderRadius: 15,
    marginBottom: 10,
  },  
  scoreInput: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 20,
  },
  submitBox: {
    backgroundColor: 'black',
    borderRadius: 15,
    paddingVertical: 5,
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
  },
  username: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  Question: {
    width: '40%',
    fontSize: 30,
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "transparent",
  },
  stretch: {
    marginTop: 2,
    width: 30,
    height: 27,
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
    fontSize: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
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
    color: "#D4AF37"
    
  },
  ratingFontConstant: {
    fontSize: 20,
    color: "#D4AF37"
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
    alignItems: 'center',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowColor: "black",
    textShadowRadius: 1
  },
});


export default RecipeCard;