import React from "react";
import { ImageBackground, StyleSheet, useWindowDimensions, View } from "react-native";
import BackgroundImageApp from '@/assets/bg-app-auth.png';
import BackgroundImageMain from '@/assets/bg-app-main.png'

export const AppBackgroundImage = (props) => {
  const { width, height } = useWindowDimensions();
  console.log(width)
  return (
    <View style={[styles.bgImageWrapper, { left: 0, right: 0}]}>
      <ImageBackground
      source={props.isAuth ? BackgroundImageApp : BackgroundImageMain}
      imageStyle={styles.imageBackground}
      style={[styles.background, {width: width, height: height * 1.05}]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  imageBackground: {
    resizeMode: 'stretch',
  },
});
