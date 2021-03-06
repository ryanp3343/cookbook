import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Pressable, FlatList } from 'react-native';
import ForumCard from '../components/ForumCard';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import FilterLabel from './FilterLabel';
import Firebase from '../config/firebase.js'
import DropDownPicker from 'react-native-dropdown-picker';

const placeHolder = "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"

const Forum = ({ forum, navigation }) => (
  <Pressable onPress={() => navigation.navigate('ForumExpand', {
    name: forum.Name,
    title: forum.Question,
    repliesAmount: forum.Replies,
    description: forum.Description,
    id: forum.id,
    ProfileURL: forum.ProfUrl,
    uid: forum.Uid
  })}>
      <ForumCard key={forum.id} uid={forum.Uid} photoURL={forum.ProfUrl ? forum.ProfUrl : placeHolder} name={forum.Name} title={forum.Question} id={forum.Uid} repliesAmount={forum.Replies}/>
  </Pressable>
);

export default function ForumList({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedId, setSelectedId] = useState(null);
  const[forums, setForums] = useState([]);
  const[newForums, setNewForums] = useState([]);
  const [searchText, onChangeText] = React.useState("");
  const[loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'Breakfast', value: 'Breakfast'},
    {label: 'Lunch', value: 'Lunch'},
    {label: 'Dinner', value: 'Dinner'},
    {label: 'Desert', value: 'Desert'},
    {label: 'Snack', value: 'Snack'},
    {label: 'Drink', value: 'Drink'},
    {label: 'Other', value: 'Other'}
  ]);

  const getForums = async () => {
    const fireDB = Firebase.firestore();
    const ref = fireDB.collection('newforums');
    await ref.onSnapshot((QuerySnapshot) => {
        const temp = [];
        QuerySnapshot.forEach((doc) => {
          let currentID = doc.id
          let appObj = { ...doc.data(), ['id']: currentID }
          temp.push(appObj);
        });
        setForums(temp)
        setNewForums(temp)
    })
}

  const filterForums = () => {
    const temp = [];
    if (value == "All") {
      setNewForums(forums)
    } else {
      for (let x of forums) {
        if(x.Tag == value) {
          temp.push(x)
        }
      }
      setNewForums(temp)
    }
  }

  useEffect(() => {
    getForums();
  }, []);

  useEffect(() => {
    filterForums();
  }, [value]);

  const renderItem = ({ item }) => {
    return (
      <Forum
        forum={item}
        navigation={navigation}
      />
    );
  };

  return (
    

      <View style={styles.container}>
      <View style={styles.filterList}>
      <DropDownPicker
              placeholder='Select Type'
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
      </View>
      <FlatList
        data={newForums}
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