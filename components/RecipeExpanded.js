import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Firebase from '../config/firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { doc, setDoc } from "firebase/firestore"; 
import CommentCard from "../components/CommentCard"
import firebase from 'firebase'
import { AVPlaybackStatus, Video } from 'expo-av';
import 'firebase/firestore';
// import { Button, InputField, ErrorMessage } from '../components';

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

export default function RecipeExpanded({navigation, route}) {
    const { name, directions, photoURL, ingredients, recipeid, vidurl } = route.params;
    const [Comment, setComment] = useState('');
    const [Comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [height, setHeight] = useState(40);
    const video = React.useRef(null);
    const [status, setStatus] = useState({});

    const db = Firebase.firestore()
    const auth = Firebase.auth();

    const updateSize = (height) => {
        setHeight(height)
    }

    const createComment = async () => {
        await auth.onAuthStateChanged(user =>{
          if(user){
            db.collection("newusers").doc(user.uid).get().then((docRef) => {
            const snapshot = docRef.data();
            // userName = snapshot["username"];
            console.log(typeof(snapshot["username"]))

            Firebase.firestore()
                .collection("recipeComments")
                .add({Comment: Comment,
                    pfpURL: snapshot["profUrl"],
                    Name: snapshot["username"],
                    Recipe_id: JSON.stringify(recipeid),
                    Time: Date.now()
                    }).then((docRef) => {
                        console.log("Document ID saved to recipe_comment array: ", docRef.id);
                        db.collection("newrecipes").doc(recipeid).update({ Comments: arrayUnion(docRef.id) });
                    }).catch((error) => {
                        console.error("Error adding document: ", error);
                    });

            })
            setComment('');
          }
        })
      };

    const getComments = async () => {
        setLoading(true);
        await auth.onAuthStateChanged(user =>{
            if(user){
                let recipe_ID = JSON.stringify(recipeid);
                const ref = db.collection('recipeComments').orderBy("Time", "desc");
                ref.onSnapshot((QuerySnapshot) => {
                    const comments = [];
                    QuerySnapshot.forEach((doc) => {
                    if(doc.data()["Recipe_id"] == recipe_ID){
                        let currentID = doc.recipeid
                        let appObj = { ...doc.data(), ['id']: currentID }
                        comments.push(appObj)
                    }
                    });
                    setComments(comments);
                    setLoading(false);
                });
            }
        })
    }

    useEffect(() => {
        getComments();
        }, []);

    return (
        <View style={styles.Container}>
            <Pressable onPress={() => navigation.navigate('RecipesList')}>
                <View style={styles.backButton}>
                    <Icon size={40} name="arrow-left" type='feather' color='#000'/>
                </View>
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}>
            <View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <ScrollView horizontal={true}>
                        <Image source={{uri: photoURL}}
                           style={{width: 320, height: 320, borderRadius: 15, marginBottom: 10, marginRight: 15}}
                        />
                        <Video
                            ref={video} 
                            style={styles.video}
                            source={{
                                uri: vidurl,
                            }}
                            useNativeControls
                            resizeMode='contain'
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                    </ScrollView>
                    <View style={styles.directionContainer}>
                        <Text style={styles.header}>Ingredients:</Text>
                        <Text style={styles.description}>{ingredients}</Text>
                    </View>
                    <View style={styles.ingredientContainer}>
                        <Text style={styles.header}>Directions:</Text>
                        <Text style={styles.description}>{directions}</Text>
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
                    multiline
                    numberOfLines={1}
                    onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                    require={true}
                />

                <View style={styles.submit}>
                    <TouchableOpacity  onPress={() => (createComment())}>
                        <Text style={styles.submitText}>Comment</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {Comments?.map((com, index) => (
                        <CommentCard key={index} name={com.Name} comment={com.Comment} profilePhoto={com.pfpURL}/>
                    ))} 
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
    paddingHorizontal: 10,
    paddingBottom: 60,
    backgroundColor: '#fff'
  },
  backButton: {
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 30,
    marginVertical: 10,
},
text: {
    fontSize: 20,
    fontWeight: 'bold'
},
title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
},
description: {
    marginTop: 5,
    fontSize: 20,
},
descriptionContainer: {
    paddingHorizontal:10,
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
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  submitText: {
      fontSize: 16,
      color: '#3f5c41',
      fontWeight: 'bold'
  },
  Scroll: {
      marginTop: 10,
   },
   header: {
       fontSize: 20,
       fontWeight: 'bold',
   },
   ingredientContainer: {
        marginBottom: 10,
   },
   directionContainer: {
        marginBottom: 10,
   },
   video: {
       alignSelf:'center',
       width: 320,
       height: 320,
   },
   buttons: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
   },

});