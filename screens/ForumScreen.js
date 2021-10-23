import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import ForumCard from '../components/ForumCard';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();
const fireDB = Firebase.firestore();

export default function ForumScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const[forums, setForums] = useState([]);
  const [text, onChangeText] = React.useState("");
  const[loading, setLoading] = useState(false);

  const ref = fireDB.collection('Forums');
  
  const getForums = () => {
    setLoading(true);
    ref.onSnapshot((QuerySnapshot) => {
      const forums = [];
      QuerySnapshot.forEach((doc) => {
        forums.push(doc.data());
      });
      setForums(forums);
      setLoading(false);
    });
  }

  useEffect(() => {
    getForums();
  });

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content'/>
      <TextInput style={styles.input}  placeholder="Search" value={text}/>
      <Text>Filter by:</Text>

      <ScrollView style={styles.Scroll}>
        {forums.map((forum) => (
          <ForumCard name={forum.Name} title={forum.Question} repliesAmount={forum.Replies}/>
        ))}
        <ForumCard name="Skinner" title="Cut my Finger!" repliesAmount={15}/>
        <ForumCard name="Skinner" title="Chicken undercooked?" repliesAmount={5}/>
        <ForumCard name="Skinner" title="Freeze milk?" repliesAmount={20}/>
        <ForumCard name="Skinner" title="Best Cheese?" repliesAmount={3}/>
        <ForumCard name="Skinner" title="Beef Steak Dry?" repliesAmount={23}/>
        <ForumCard name="Skinner" title="Spork or Foon?" repliesAmount={121}/>
        <ForumCard name="Skinner" title="Cut my Finger!" repliesAmount={15}/>
        <ForumCard name="Skinner" title="Cut my Finger!" repliesAmount={15}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE7E0',
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 60
  },
   Scroll: {
    marginTop: 10,
   },
   input: {
     backgroundColor: '#fff',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },

});