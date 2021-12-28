import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import useSignOut from '../hooks/useSignOut';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#a82525',
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  scrollViewStyle: {
    flexDirection: 'row',
  }
});

const Logout = () => {
  const signOut = useSignOut();
  return (
    <Pressable onPress={async () => await signOut()}>
    <Text style={{ color: 'white', marginHorizontal:10 }} fontWeight="bold" fontSize="subheading">Sign out</Text>
  </Pressable>
  );
};

const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser();

  return(
  <View style={styles.container}>
    <ScrollView horizontal style={styles.scrollViewStyle}>
      <AppBarTab tabName={"Repositories"} link={"/"} ></AppBarTab>
      {authorizedUser ?
        <>
          <AppBarTab tabName={"My Reviews"} link={"/myreviews"} ></AppBarTab>
          <AppBarTab tabName={"Create a review"} link={"/createReview"} ></AppBarTab>
          <Logout />
        </>
        :
        <>
          <AppBarTab tabName={"Sign in"} link={"/signin"} > </AppBarTab>
          <AppBarTab tabName={"Sign up"} link={"/signup"} > </AppBarTab>
        </>
      }
    </ScrollView>
  </View>
  );
};

export default AppBar;