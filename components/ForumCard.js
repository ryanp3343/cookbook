import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


const ForumCard = ({name, photoURL, title, question, replies, repliesAmount}) => {
    return (
        <View style={styles.Card}>
            <View style={styles.Title}>
                <Image style={styles.Logo} source={require('../imgs/pfp1.jpg')}></Image>
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <View style={styles.Description}>
                <Text style={styles.TitleText}>{title}</Text>
                {/* <Text>{repliesAmount ? repliesAmount : "no"} replies</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  Card: {
    borderBottomWidth: 1,
    borderColor: '#D8d8d8',
    fontSize: 20,
    fontWeight: '600',
    width: '100%',
    padding: 10,
    alignSelf: 'center'
  },
  Title: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  Logo: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: 'contain'
  },
  Description: {
    height:40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginTop: 10,
  },
  TitleText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '400',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '500',
  }
});

export default ForumCard;