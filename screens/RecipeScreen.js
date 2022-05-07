import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity, FlatList} from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import RecipeEditor from '../components/RecipeEditor';
import RecipeCard from '../components/RecipeCard';
import { Icon } from 'react-native-elements/dist/icons/Icon';

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

export default function RecipeScreen({navigation}) {
  const placeHolder = "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
  const [selectedId, setSelectedId] = useState(null);
  const[recipes, setRecipes] = useState([]);
  const [text, onChangeText] = React.useState("");
  const [userRef, setUserRef] = useState({});
  const[loading, setLoading] = useState(false);
  const[editor, setEditor] = useState(true);

  const db = Firebase.firestore()
  const auth = Firebase.auth();


  const getRecipes = async () => {
    const fireDB = Firebase.firestore();
    const ref = fireDB.collection('newrecipes');
    ref.onSnapshot((QuerySnapshot) => {
        const recipes = [];
        QuerySnapshot.forEach((doc) => {
          let currentID = doc.id
          let appObj = { ...doc.data(), ['id']: currentID }
          recipes.push(appObj);
        });
        setRecipes(recipes)
    })
    await auth.onAuthStateChanged(user =>{
      fireDB.collection('newusers').doc(user.uid).get().then((docRef) =>{
        setUserRef(docRef.data());    
    })
    })
}

  useEffect(() => {
    getRecipes();
  },[]);

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
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
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
    backgroundColor: "#949D7E",
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
},
});