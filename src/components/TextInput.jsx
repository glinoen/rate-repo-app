import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  error: {
    borderColor: 'red'
  }
});

const TextInput = ({ style, error, ...props }) => {
  let textInputStyle = [style];
  if (error) {
    textInputStyle = [style, styles.error];
  }
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;