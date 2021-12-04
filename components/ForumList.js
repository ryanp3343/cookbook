import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Pressable } from 'react-native';
import ForumCard from '../components/ForumCard';
import ForumEditor from '../components/ForumEditor';
import Firebase from '../config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const auth = Firebase.auth();
const fireDB = Firebase.firestore();

export default function ForumList({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const[forums, setForums] = useState([]);
  const [text, onChangeText] = React.useState("");
  const[loading, setLoading] = useState(false);
  const[editor, setEditor] = useState(true);

  const ref = fireDB.collection('newforums');
  
  const getForums = () => {
    setLoading(true);
    ref.onSnapshot((QuerySnapshot) => {
      const forums = [];
      QuerySnapshot.forEach((doc) => {
        let currentID = doc.id
        let appObj = { ...doc.data(), ['id']: currentID }
        forums.push(appObj)
      });
      setForums(forums);
      setLoading(false);
    });
  }

  useEffect(() => {
    getForums();
  }, []);

  return (
      <View style={styles.container}>
      <StatusBar style='dark-content'/>
      <TextInput style={styles.input}  placeholder="Search" value={text}/>
      <View style={styles.editorButton}>
      <Pressable onPress={() => navigation.navigate('Editor')}>
            <Icon size={40} name="edit" type='material' color='#fff'/>
      </Pressable>
      </View>
      <Text>Filter by:</Text>
      <ScrollView style={styles.Scroll}>
        {forums.map((forum, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('ForumExpand', {
            name: forum.Name,
            title: forum.Question,
            repliesAmount: forum.Replies,
            description: forum.Description,
            id: forum.id
          })}>
              <ForumCard key={index} name={forum.Name} title={forum.Question} repliesAmount={forum.Replies}/>
          </Pressable>
        ))}
        {/* <ForumCard name="Skinner" title="Cut my Finger!" repliesAmount={15}/>
        <ForumCard name="Skinner" title="Chicken undercooked?" repliesAmount={5}/>
        <ForumCard name="Skinner" title="Freeze milk?" repliesAmount={20}/>
        <ForumCard name="Skinner" title="Best Cheese?" repliesAmount={3}/>
        <ForumCard name="Skinner" title="Beef Steak Dry?" repliesAmount={23}/>
        <ForumCard name="Skinner" title="Spork or Foon?" repliesAmount={121}/>
        <ForumCard name="Skinner" title="Cut my Finger!" repliesAmount={15}/>
        <ForumCard name="Skinner" title="Cut my Finger!" repliesAmount={15}/> */}
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
   input: {
    backgroundColor: '#fff',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
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
  text: {
    fontSize: 80,
    color: "white"
  },
});