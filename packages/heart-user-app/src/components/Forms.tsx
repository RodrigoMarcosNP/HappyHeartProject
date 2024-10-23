import React from "react";
import { useRef, useMemo } from "react";
import { Controller } from "react-hook-form";
import { TextInputProps, TextInput, useWindowDimensions, View, Text, StyleSheet } from "react-native";

const WIDTH_FACTOR = 5;

type Inputs = {
  email: string;
  password: string;
};

export const TextField = ({ label, inputName, control, rules, ...inputProps }: { label: string; inputName: keyof Inputs; control: any; rules?: any } & TextInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const { width } = useWindowDimensions();
  const containerWidth = useMemo(() => width - 25 * WIDTH_FACTOR, [width]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={{ width: containerWidth }} onTouchEnd={handleFocus}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        name={inputName}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholderTextColor="gray"
            {...inputProps}
          />
        )}
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
