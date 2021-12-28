import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";
import useUserReviews from "../hooks/useUserReviews";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    marginTop: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;


const UserReviewsPageContainer = ({ data }) => {

  const reviews = data
    ? data.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <ReviewItem review={item} authorized={true}/>}
    />
  );
};

const UserReviewsPage = () => {
  const { authorizedUser } = useUserReviews();
  return (
    <UserReviewsPageContainer data={authorizedUser}/>
  );
};

export default UserReviewsPage;