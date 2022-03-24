import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'

const FilterLabel = ({name, test}) => {
    const [isClicked, setisClicked] = useState(false)

    const handleClick = () => {
        setisClicked(!isClicked)
    }

  return (
    <Pressable onPress={handleClick} style={styles.FilterLabelContainer}>
      <Text>{name}</Text>
    </Pressable>
  )
}

export default FilterLabel

const styles = StyleSheet.create({
    FilterLabelContainer: {
        marginLeft: 10, 
        backgroundColor: "#ddd",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
      }
})