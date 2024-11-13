import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AvatarUserDefault from '@/assets/avatar-user-default.png';
import SettingsUserDefault from '@/assets/settings-user-default.png';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useBackPage } from "../hooks/useBackPage";
import { useSession } from "./Session/SessionProvider";

export const StatusBar = (props: { title: string, navigation: any }) => {
  const navigateBack = useBackPage(props.navigation);
  const { clearSession } = useSession();
  // Handle avatar click to navigate back to the authentication screen
  const handleAvatarClick = () => {
    clearSession();
    navigateBack('Authentication'); // Assuming 'Authentication' is the route name for your login screen
  };

  return (
    <View style={styles.barWrapper}>
      <Text style={styles.barTitle}>Olá {props.title}!</Text>
      <View style={styles.iconsWrapper}>
        {/* Avatar Icon */}
        <TouchableOpacity onPress={handleAvatarClick}>
          <Image source={AvatarUserDefault} />
        </TouchableOpacity>
        {/* Settings Icon */}
        <TouchableOpacity>
          <Image source={SettingsUserDefault} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
});
