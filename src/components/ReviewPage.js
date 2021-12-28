import React from 'react';
import Text from './Text';
import {View, Pressable, StyleSheet} from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
import { useHistory } from "react-router-native";

const validationSchema = yup.object().shape({
  repoOwnerUsername: yup
    .string()
    .required('Username is required'),
  repoName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required'),
  review: yup
    .string()
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
  repoOwnerUsername: '',
  repoName: '',
  rating: '',
  review: ''
};
export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="repoOwnerUsername" placeholder="Repositority owner's username" style={styles.input} autoCapitalize="none"/>
      <FormikTextInput name="repoName" placeholder="Repository's name" style={styles.input} autoCapitalize="none"/>
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.input}/>
      <FormikTextInput name="review" placeholder="Text review (optional)"  style={styles.input} autoCapitalize="none"/>
      <Pressable onPress={onSubmit} >
        <Text testID="submitButton" style={styles.button} fontWeight="bold" fontSize="subheading">Create a review</Text>
      </Pressable>
    </View>
  );
};



const ReviewPage = () => {
  const [reviewFunc] = useReview();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { repoOwnerUsername, repoName, rating, review } = values;

    try {
      const data = await reviewFunc({ repoOwnerUsername, repoName, rating, review });
      console.log('result from review', data);
      history.push(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log('review error:',e);
    }
  };
  return (
    <ReviewFormContainer onSubmit={onSubmit} />
  );
};


export default ReviewPage;