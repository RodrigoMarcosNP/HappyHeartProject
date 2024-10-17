import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";

export const BtnAuth = ({title, onPress}: {title: string, onPress: (event: GestureResponderEvent) => void}) => (
  <TouchableOpacity onPress={onPress} style={styles.btnAuth}>
    <Text style={styles.titleBtn}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btnAuth: {
    backgroundColor: '#000',
    borderRadius: 5, padding: 5, marginTop: 10,
  },
  titleBtn: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
})