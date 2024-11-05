import React, { useRef, useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps, TextInput, useWindowDimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const WIDTH_FACTOR = 5;

interface TextFieldProps extends TextInputProps {
  label: string;
  inputName: string;
  control: Control<any>;
  rules?: any;
  isDate?: boolean;
  onDateChange?: (date: Date) => void;
  errorMessage?: string; 
}

export const TextField = ({ 
  label, 
  inputName, 
  control, 
  rules, 
  isDate = false, 
  onDateChange,
  errorMessage, 
  ...inputProps 
}: TextFieldProps) => {
  const inputRef = useRef<TextInput>(null);
  const { width } = useWindowDimensions();
  const containerWidth = useMemo(() => width - 25 * WIDTH_FACTOR, [width]);
  const [isOpenedDate, setOpenDate] = useState<boolean>(false);

  const handleFocus = () => {
    if (isDate) {
      setOpenDate(true);
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setOpenDate(false);
    if (event.type === 'set' && date) {
      console.log('date:', date)
      onDateChange?.(date);
    }
  };

  return (
    <View style={{ width: containerWidth }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleFocus}>
        <Controller
          name={inputName}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={isDate ? value ? value.split('T')[0] : "" : value ?? ""}
              onBlur={onBlur}
              onChangeText={(text) => isDate ? onChange(text) : onChange(text)}
              placeholderTextColor="gray"
              editable={!isDate}
              onPressIn={isDate ? handleFocus : undefined} 
              {...inputProps}
            />
          )}
        />
      </TouchableOpacity>
      {isOpenedDate && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          is24Hour={true}
          onChange={handleDateChange}
        />
      )}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
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
    color: '#000',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 5,
    paddingLeft: 6.5,
    paddingRight: 6.5,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});
