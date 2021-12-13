import React from 'react';

import Text from './Text';
import {View, Pressable, StyleSheet} from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
      backgroundColor: '#b00000',
      color: 'white',
      textAlign: 'center',
      padding: 10,
      margin: 10
  }
  // ...
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="username" style={styles.input}/>
      <FormikTextInput name="password" placeholder="password" secureTextEntry={true} style={styles.input}/>
      <Pressable onPress={onSubmit} >
        <Text style={styles.button} fontWeight="bold" fontSize="subheading">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;