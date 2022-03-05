import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const RecipeCard = ({name, directions, ingredients, url, recipe}) => {
    const [directionList, setDirectionList] = useState([]);
    const [liked, setLiked] = useState(false)
    const navigation = useNavigation();
    
    const likeRecipe = () => {
      alert("you liked " + recipe.id)
    }

    const commentRecipe = () => {
      alert("you commented " + recipe.Title)
    }

    const visitProfile = () => {
      alert("you visited user for " + recipe.Title)
    }

    return (
        <View style={styles.Card}>
          <Pressable onPress={() => navigation.navigate('RecipeExpanded', {
            name: recipe.Title,
            directions: recipe.Directions,
            photoURL: recipe.Url,
            ingredients: recipe.Ingredients,
            id: recipe.id
          })}>
            <View style={styles.Title}>
                <Text style={styles.recipeTitle}>{name}</Text>
                <Image source={{uri: url}}
                       style={{width: "100%", height: 320}}
                 />
                 <View style={styles.directionsContainer}>
                    
                 </View>
            </View>
          </Pressable>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => likeRecipe()}>
                <Icon style={styles.icon} size={40} color={liked ? "#f22" : "#000"} name="heart" type='feather' color='#000'/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => commentRecipe()}>
                <Icon style={styles.icon} size={40} name="message-square" type='feather' color='#000'/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => visitProfile()}>
                <Icon style={styles.icon} size={40} name="user" type='feather' color='#000'/>
              </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  Card: {
    // backgroundColor: '#ddd',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '600',
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#D8d8d8',
  },
  recipeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
  Title: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  Logo: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  Description: {
    height:40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  TitleText: {
    fontSize: 20,
    color: '#4D4D3D',
    fontWeight: 'bold',
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginVertical: 5,
      paddingLeft: 10,
  },
  icon: {
      marginRight: 25,
  },
  directionsContainer: {
      marginVertical: 10,
  },
  directions: {
      fontSize: 15,
  },
  directionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
  }
});

export default RecipeCard;