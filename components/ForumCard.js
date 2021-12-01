import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


const ForumCard = ({name, photoURL, title, question, replies, repliesAmount}) => {
    return (
        <View style={styles.Card}>
            <View style={styles.Title}>
                <Image style={styles.Logo} source={require('../imgs/pfp1.jpg')}></Image>
                <Text>{name}</Text>
            </View>
            <View style={styles.Description}>
                <Text style={styles.TitleText}>{title}</Text>
                <Text>{repliesAmount ? repliesAmount : "no"} replies</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  Card: {
    borderWidth: 1,
    borderColor: '#D8d8d8',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
    width: 340,
    height: 100,
    borderRadius: 10,
    padding: 10,
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
  }
});

export default ForumCard;