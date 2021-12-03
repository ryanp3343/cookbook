import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import RecipeEditor from '../components/RecipeEditor';
import RecipeCard from '../components/RecipeCard';
import { Icon } from 'react-native-elements/dist/icons/Icon';


const fireDB = Firebase.firestore();

export default function RecipeScreen({navigation}) {
  const[recipes, setRecipes] = useState([]);
  const [text, onChangeText] = React.useState("");
  const[loading, setLoading] = useState(false);
  const[editor, setEditor] = useState(true);


  const ref = fireDB.collection('newrecipes');
  
  const getRecipes = () => {
    setLoading(true);
    ref.onSnapshot((QuerySnapshot) => {
      const recipes = [];
      QuerySnapshot.forEach((doc) => {
        recipes.push(doc.data());
        console.log(doc.data())
      });
      setRecipes(recipes);
      setLoading(false);
    });
  }

  useEffect(() => {
    getRecipes();
  },[]);

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.editorButton}>
      <Pressable onPress={() => navigation.navigate('RecipeEditor')}>
            <Icon size={40} name="edit" type='material' color='#fff'/>
      </Pressable>
      </View>
        <ScrollView style={styles.Scroll}  showsVerticalScrollIndicator={false}
                                           showsHorizontalScrollIndicator={false}>
        {recipes.map((recipe, index) => (
           <Pressable key={index} onPress={() => navigation.navigate('RecipeExpanded', {
            name: recipe.Title,
            directions: recipe.Directions,
            photoURL: recipe.Url,
            ingredients: recipe.Ingredients
          })}>
              <RecipeCard key={index} name={recipe.Title} directions={recipe.directions} url={recipe.Url} ingredients={recipe.ingredients}/>
          </Pressable>
        ))}
         <RecipeCard key={1} name={"Spaghetti"} url={'https://www.eatthis.com/wp-content/uploads/sites/4/2019/01/healthy-spaghetti-spicy-tomato-sauce.jpg?fit=1200%2C879&ssl=1'} directions={"odk"} ingredients={"odk"}/>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 60
  },
  Scroll: {
    marginTop: 10,
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
  editorButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#3f5c41",
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
},
});