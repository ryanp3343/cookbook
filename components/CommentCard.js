import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { color } from 'react-native-reanimated';


const CommentCard = ({name, comment, profilePhoto}) => {
    return (
        <View style={styles.Card}>
            <View style={styles.Title}>
                <Image style={styles.Logo} source={{uri: profilePhoto}}></Image>
                <Text style={styles.NameTitle}>{name}</Text>
            </View>
            <View style={styles.Description}>
                <Text style={styles.TitleText}>{comment}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  Card: {
    borderBottomWidth: 1,
    borderColor: '#D8d8d8',
    marginBottom: 10,
    fontWeight: '600',
    width: '100%',
    padding: 10,
    backgroundColor: 'white'
  },
  Title: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  Logo: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  Description: {
    marginTop: 5,
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
  NameTitle: {
    fontWeight: 'bold',
    color: '#101010',
    fontSize: 20,
  }
});

export default CommentCard;