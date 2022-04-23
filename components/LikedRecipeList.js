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

const LikedRecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [text, onChangeText] = useState("");
    const [userRef, setUserRef] = useState({});
    const [loading, setLoading] = useState("");
    const [profile, setProfile] = useState([]);
  
    const getLikedRecipes = async () => {
        await auth.onAuthStateChanged(user => {
            if(user){
              fireDB.collection('newusers').doc(user.uid).get().then((docRef) =>{
                // profile.push(docRef.data())
                 setProfile(docRef.data());
                 console.log("REF 1 " + docRef.data())
                 console.log("UID " + user.uid)
                 var temp = []
                 profile.savedRecipes.forEach((recipeID) => {
                     fireDB.collection('newrecipes').doc(recipeID).get().then((docRef) =>{
                     console.log("REF 2 " + docRef.data())
                     temp.push(docRef.data())
                    })
                })   
                console.log("TEMP " +temp)
                setRecipes(temp)
                console.log("------------------------------------------------------------------------------------")
                console.log("END RESULT " + recipes)
              })
            }   
        })  
    }
  
    useEffect(() => {
        getLikedRecipes();
    },[]);

  return (
    <View>
      <ScrollView style={styles.Scroll}  showsVerticalScrollIndicator={false}
                                           showsHorizontalScrollIndicator={false}>
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
              />
        ))}
        </ScrollView>
    </View>
  )
}

export default LikedRecipeList

const styles = StyleSheet.create({})