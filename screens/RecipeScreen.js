import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import RecipeCard from '../components/RecipeCard';
//import RecipeEditor from '../components/RecipeEditor';

const auth = Firebase.auth();

export default function RecipeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const[recipe, setRecipe] = useState([]);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
        <ScrollView style={styles.Scroll}>
        {recipe.map((recipe) => (
          <RecipeCard name={recipe.Name} title={recipe.Question} repliesAmount={recipe.Replies}/>
        ))}
          <RecipeCard name="Gordan Ramsay" title="Beef Wellington" repliesAmount={1337}/>
          <RecipeCard name="Gordan Ramsay" title="Scrambled Eggs" repliesAmount={42}/>
          <RecipeCard name="Gordan Ramsay" title="Truffle Mac & Cheese" repliesAmount={28}/>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE7E0',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
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
  }
});
