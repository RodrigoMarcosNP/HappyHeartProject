import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export const SafeAreaView: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <View style={styles.SafeAreaContainer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  SafeAreaContainer: {
    paddingTop: 15,
    flex: 1,
  },
});
