import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

export const BtnSubmit = ({title, onPress}: {title: string, onPress: (event: GestureResponderEvent) => void}) => (
  <TouchableOpacity onPress={onPress} style={styles.BtnSubmit}>
    <Text style={styles.titleBtn}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  BtnSubmit: {
    backgroundColor: '#000',
    borderRadius: 5, padding: 5, marginTop: 10,
  },
  titleBtn: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
})