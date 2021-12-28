import React from 'react';
import Text from './Text';
import {View, Pressable, StyleSheet} from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username length must be 1-30')
    .max(30, 'Username length must be 1-30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'password length must be 5-50')
    .max(50, 'password length must be 5-50')
    .required('password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required')
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
  passwordConfirmation: ''
};

export const SignUpFormContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="username" style={styles.input} autoCapitalize="none"/>
      <FormikTextInput name="password" placeholder="password" style={styles.input} secureTextEntry={true}/>
      <FormikTextInput name="passwordConfirmation" placeholder="password confirmation" style={styles.input} secureTextEntry={true}/>
      <Pressable onPress={onSubmit} >
        <Text testID="submitButton" style={styles.button} fontWeight="bold" fontSize="subheading">Sign Up</Text>
      </Pressable>
    </View>
  );
};



const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log('signin');

    try {
      const data = await signUp({ username, password });
      if (data.createUser) {
        await signIn({ username, password });
        console.log('result from sign in',data);
        history.push("/");
      }
    } catch (e) {
      console.log('review error:',e);
    }
  };
  return (
    <SignUpFormContainer onSubmit={onSubmit} />
  );
};


export default SignUp;