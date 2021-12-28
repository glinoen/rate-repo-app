import React from 'react';
import Text from './Text';
import {View, Pressable, StyleSheet} from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";

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
export const SignInFormContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput testID="usernameField" name="username" placeholder="username" style={styles.input} autoCapitalize="none"/>
      <FormikTextInput testID="passwordField" name="password" placeholder="password" secureTextEntry={true} style={styles.input}/>
      <Pressable onPress={onSubmit} >
        <Text testID="submitButton" style={styles.button} fontWeight="bold" fontSize="subheading">Sign in</Text>
      </Pressable>
    </View>
  );
};



const SignIn = () => {
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log('result from sign in',data);
      history.push("/");
    } catch (e) {
      console.log('sign in eerror:',e);
    }
  };
  return (
    <SignInFormContainer onSubmit={onSubmit} />
  );
};


export default SignIn;