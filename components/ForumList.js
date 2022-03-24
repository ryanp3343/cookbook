import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import ForumCard from '../components/ForumCard';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import FilterLabel from './FilterLabel';
import { getForums } from '../backend/Crud';

export default function ForumList({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const[forums, setForums] = useState([]);
  const [searchText, onChangeText] = React.useState("");
  const[loading, setLoading] = useState(false);
  const[editor, setEditor] = useState(true);

  const getFor = () => {
    setLoading(true);
    let forums = getForums()
    setForums(forums);
    setLoading(false);
  }

  const filterForums = () => {
    alert("filtered " + searchText)
  }

  useEffect(() => {
    getFor();
  }, []);

  return (
      <View style={styles.container}>
      <StatusBar style='dark-content'/>
      <View style={styles.searchBar}>
        <TextInput style={styles.input}  placeholder="Search" value={searchText} onChangeText={onChangeText}/>
        <Pressable onPress={() => filterForums()}>
          <Icon size={40} name="search" type='feather' color='#aaa'/>
        </Pressable>
      </View>
      <View style={styles.filterList}>
        <FilterLabel name={"desert"} />
        <FilterLabel name={"drinks"} />
        <FilterLabel name={"dinner"} />
        <FilterLabel name={"lunch"} />
      </View>
      <View style={styles.editorButton}>
        <Pressable onPress={() => navigation.navigate('Editor')}>
            <Icon size={40} name="edit" type='feather' color='#fff'/>
        </Pressable>
      </View>
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
    paddingHorizontal: 0,
    paddingBottom: 60
  },
   Scroll: {
    marginTop: 10,
    marginHorizontal: 5,
   },
   searchBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    backgroundColor: '#0000',
   }, 
   input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 20,
    flex: 5,
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
  text: {
    fontSize: 80,
    color: "white"
  },
  filterList: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});