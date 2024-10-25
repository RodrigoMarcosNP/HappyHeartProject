import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

const SafeAreaView: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <View style={styles.SafeAreaContainer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  SafeAreaContainer: {
    paddingTop: 13,
    flex: 1,
  },
});

export default SafeAreaView;
