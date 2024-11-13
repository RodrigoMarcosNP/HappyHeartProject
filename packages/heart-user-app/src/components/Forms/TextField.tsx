import React, { useRef, useMemo, useState, useCallback } from "react";
import { Control, Controller, UseFormSetValue, UseFormSetError } from "react-hook-form";
import { TextInputProps, TextInput, useWindowDimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const WIDTH_FACTOR = 5;

interface TextFieldProps extends TextInputProps {
  label: string;
  inputName: string;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  setError?: UseFormSetError<any>;
  rules?: any;
  isDate?: boolean;
  onDateChange?: (date: Date) => void;
  errorMessage?: string;
  isLabelBlack?: boolean;
  modeDateTime?: "date" | "datetime" | "time";
  isEmail?: boolean;
  isCpf?: boolean;
}

export const TextField = ({
  label,
  inputName,
  control,
  setError,
  rules,
  setValue,
  isDate = false,
  onDateChange,
  errorMessage,
  modeDateTime = "date",
  isLabelBlack = false,
  isEmail = false,
  isCpf = false,
  ...inputProps
}: TextFieldProps) => {
  const inputRef = useRef<TextInput>(null);
  const { width } = useWindowDimensions();
  const containerWidth = useMemo(() => width - 25 * WIDTH_FACTOR, [width]);
  const [isOpenedDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleFocus = useCallback(() => {
    if (isDate) {
      setOpenDate(true);
      inputRef.current?.blur(); // Close the keyboard
    } else {
      inputRef.current?.focus();
    }
  }, [isDate]);

  const handleDateChange = useCallback((event: any, date?: Date) => {
    if (event.type === 'set' && date) {
      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() - 3); // Adjust for time zone

      const formattedDate = modeDateTime === 'time'
        ? adjustedDate.toISOString().split('T')[1].slice(0, 5)
        : adjustedDate.toISOString().split('T')[0];
      console.log(formattedDate)
      setValue(inputName, formattedDate);
      setSelectedDate(adjustedDate);
      onDateChange?.(adjustedDate);
    }
    setOpenDate(false); // Close the picker after selection
  }, [inputName, modeDateTime, onDateChange, setValue]);

  const formatCpf = useCallback((value: string) => {
    return value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }, []);

  const validateEmail = useCallback((value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }, []);

  const handleChange = useCallback((text: string) => {
    if (isCpf) {
      const formattedCpf = formatCpf(text);
      setValue(inputName, formattedCpf);
      return formattedCpf;
    } else if (isEmail) {
      const isValid = validateEmail(text);
      setValue(inputName, text);
      if (setError) setError(inputName, { type: 'manual', message: isValid ? "" : "Formato Inválido de Email" });
      return text;
    }
    return text;
  }, [isCpf, isEmail, inputName, setValue, setError, formatCpf, validateEmail]);

  return (
    <View style={{ width: containerWidth }}>
      <Text style={isLabelBlack ? styles.labelBlack : styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleFocus}>
        <Controller
          name={inputName}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={isDate ? modeDateTime === 'time'
                ? selectedDate?.toISOString().split('T')[1].slice(0, 5)
                : selectedDate?.toISOString().split('T')[0] : value ?? ""}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(handleChange(text));
              }}
              placeholderTextColor="gray"
              editable={!isDate}
              {...inputProps}
            />
          )}
        />
      </TouchableOpacity>
      {isOpenedDate && (
        <DateTimePicker
          value={selectedDate || new Date()} // Ensure valid date is passed
          mode={modeDateTime}
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
  labelBlack: {
    color: '#000',
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
