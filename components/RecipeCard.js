import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';


const RecipeCard = ({name, directions, ingredients, url}) => {
    const [directionList, setDirectionList] = useState([]);
    
    return (
        <View style={styles.Card}>
            <View style={styles.Title}>
                <Text style={styles.recipeTitle}>{name}</Text>
                <Image source={{uri: url}}
                       style={{width: 320, height: 320}}
                 />
                 <View style={styles.directionsContainer}>
                    
                 </View>
            </View>
            <View style={styles.buttonContainer}>
                <Icon style={styles.icon} size={30} name="favorite" type='material' color='#000'/>
                <Icon style={styles.icon} size={30} name="question-answer" type='material' color='#000'/>
                <Icon style={styles.icon} size={30} name="person" type='material' color='#000'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  Card: {
    // backgroundColor: '#ddd',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
    width: 340,
    height: 'auto',
    borderRadius: 10,
    padding: 10,
  },
  recipeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
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
      marginVertical: 10,
  },
  icon: {
      marginRight: 20,
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