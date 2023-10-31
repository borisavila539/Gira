import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TextButtons } from "../Constants/Texto";
import { ButtonsInterface } from "../Interfaces/Buttons";


const Buttons = ({onPressFunction,disabled,title}:ButtonsInterface) => {
  return (
    <TouchableOpacity
      style={{ width: '100%' }}
      activeOpacity={0.5}
      onPress={onPressFunction}
      hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
      disabled={disabled}
    >
      <View style={styles.button}>
        <Text style={[styles.text]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#069A8E',
  },
  text: {
    fontSize: TextButtons,
    color: '#fff',
    fontWeight: 'bold',
    //fontFamily: 'sans-serif'
  },
})

export default Buttons;