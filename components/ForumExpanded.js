import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, ScrollView } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
import CommentCard from "../components/CommentCard"
// import { Button, InputField, ErrorMessage } from '../components';

const db = Firebase.firestore()
const auth = Firebase.auth();

export default function ForumExpanded({navigation, route}) {
    const [Comment, setComment] = useState('');
    const [Comments, setComments] = useState([]);
    const[loading, setLoading] = useState(false);
    const { name, title, repliesAmount, description, id } = route.params;

    const createComment = async () => {
        var userName
        await auth.onAuthStateChanged(user =>{
          if(user){
            db.collection("newusers").doc(user.uid).get().then((docRef) => {
              const snapshot = docRef.data();
              // userName = snapshot["username"];
              console.log(typeof(snapshot["username"]))
              Firebase.firestore()
                .collection("forumComments")
                .add({Comment: Comment,
                    Name: snapshot["username"],
                    Forum: JSON.stringify(id),
                    Time: Date.now()
                     }).then((data) => addComplete(data))
                       .catch((error) => console.log(error));
            })
          }
        })
      };

      const getComments = () => {
        setLoading(true);
        let forumID = JSON.stringify(id);
        const ref = db.collection('forumComments').where("Forum", '==', forumID);
        ref.onSnapshot((QuerySnapshot) => {
          const comments = [];
          QuerySnapshot.forEach((doc) => {
            let currentID = doc.id
            let appObj = { ...doc.data(), ['id']: currentID }
            comments.push(appObj)
          });
          setComments(comments);
          setLoading(false);
        });
      }
    

      useEffect(() => {
        getComments();
      }, []);

    return (
      <View style={styles.Container}>
        <Pressable onPress={() => navigation.navigate('List')}>
            <View style={styles.backButton}>
                <Icon size={40} name="arrow-left" type='feather' color='#000'/>
            </View>
        </Pressable>
        <ScrollView>
          <View>
            <View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.replies}>Replies:</Text>
            </View>

            <TextInput 
                style={styles.Coment}
                onChangeText={setComment}
                value={Comment}
                placeholder="Reply"
                multiline={true}
                numberOfLines={3}
                require={true}
            />

            <View style={styles.submit}>
                <Pressable  onPress={() => (createComment())}>
                    <Text style={styles.submitText}>Comment</Text>
                </Pressable>
            </View>

            <View>
              <View style={styles.commentContainer}>
                  {Comments.map((com, index) => (
                    <CommentCard key={index} name={com.Name} comment={com.Comment}/>
                  ))} 
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  Container: {
    flex : 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    paddingBottom: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  backButton: {
    flexDirection:'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 20,
  },
  descriptionContainer: {
    borderBottomWidth: 1,
    paddingHorizontal:10,
    borderColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  replies: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  Coment: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 20,
  },
  submit: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#3f5c41',
      borderWidth: 2,
      width: 100,
      height: 30,
      borderRadius: 8,
  },
  submitText: {
      fontSize: 16,
      color: '#3f5c41',
      fontWeight: 'bold'
  },
   commentContainer: {
       marginTop: 10,
       height: 300,
       marginBottom: 50,
   },
});