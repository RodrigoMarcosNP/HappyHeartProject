import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, useWindowDimensions, View } from "react-native";

const WIDTH_FACTOR = 5;

export const TextField = ({ label, ...inputProps }: { label: string } & TextInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const { width } = useWindowDimensions();

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={{ width: width - (25 * WIDTH_FACTOR) }} onTouchEnd={handleFocus}>
      <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor="gray"
          {...inputProps}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 5,
    paddingLeft: 6.5,
    paddingRight: 6.5,
  },
});
