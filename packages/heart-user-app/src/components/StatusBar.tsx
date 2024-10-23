import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import AvatarUserDefault from '@/assets/avatar-user-default.png'
import SettingsUserDefault from '@/assets/settings-user-default.png'
import { TouchableOpacity } from "react-native-gesture-handler"

export const StatusBar = (props: {title: string}) => {
  return (
    <View style={styles.barWrapper}>
      <Text style={styles.barTitle}>Olá {props.title}!</Text>
      <View style={styles.iconsWrapper}>
        <TouchableOpacity>
          <Image source={AvatarUserDefault}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={SettingsUserDefault}></Image>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  barWrapper: {
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  iconsWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  barTitle: {
    color: 'white',
    justifyContent: 'center'
  }
})