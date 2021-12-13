import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#a82525',
    paddingBottom: 10,
    justifyContent: 'space-between',
    
    // ...
  },
  scrollViewStyle: {
    flexDirection: 'row',
  }
  // ...
});

const AppBar = () => {
  return(
  <View style={styles.container}>
    <ScrollView horizontal style={styles.scrollViewStyle}>
      <AppBarTab tabName={"Repositories"} link={"/"} ></AppBarTab>
      <AppBarTab tabName={"Sign in"} link={"/signin"} > </AppBarTab>
    </ScrollView>
  </View>
  );
};

export default AppBar;