import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';


const ForumCard = ({name, photoURL, title, question, replies, repliesAmount, id}) => {
  const navigation = useNavigation()

    return (
        <View style={styles.Card}>
          <Pressable onPress={() => navigation.navigate("ProfileExpanded", {
            id: id
          })}>
            <View style={styles.Title}>
                <Image resizeMode='cover' style={styles.Logo} source={{uri: photoURL}}></Image>
                <Text style={styles.nameText}>{name}</Text>
            </View>
          </Pressable>
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
    borderRadius: 200,
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