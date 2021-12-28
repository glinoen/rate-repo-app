import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryListContainer from './RepositoryList';
import AppBar from './AppBar';
import { Route, Switch } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepositoryItem from './SingleRepositoryItem';
import ReviewPage from './ReviewPage';
import SignUp from './SignUp';
import UserReviewsPage from './UserReviewsPage';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  },
});



const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryListContainer />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/createReview" exact>
          <ReviewPage />
        </Route>
        <Route path="/myreviews" >
          <UserReviewsPage />
        </Route>
        <Route path="/:id" exact>
          <SingleRepositoryItem />
        </Route>
      </Switch>
    </View>
  );
};


export default Main;