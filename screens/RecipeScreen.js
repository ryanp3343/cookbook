import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import RecipeEditor from '../components/RecipeEditor';
import RecipeCard from '../components/RecipeCard';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { db } from '../config/firebase';



export default function RecipeScreen({navigation}) {
  const[recipes, setRecipes] = useState([]);
  const [text, onChangeText] = React.useState("");
  const[loading, setLoading] = useState(false);
  const[editor, setEditor] = useState(true);


  const ref = db.collection('newrecipes');
  
  const getRecipes = () => {
    setLoading(true);
    ref.onSnapshot((QuerySnapshot) => {
      const recipes = [];
      QuerySnapshot.forEach((doc) => {
        let currentID = doc.id
        let appObj = { ...doc.data(), ['id']: currentID }
        recipes.push(appObj);
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
              <RecipeCard key={index} recipe={recipe} name={recipe.Title} directions={recipe.directions} url={recipe.Url} ingredients={recipe.ingredients}/>
        ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 60
  },
  Scroll: {
    marginTop: 0,
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