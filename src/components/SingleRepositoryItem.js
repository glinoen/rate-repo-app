import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from 'react-router-native';
import { FlatList, StyleSheet, View } from "react-native";
import useRepository from "../hooks/useRepository";
import Text from "./Text";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    marginTop: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryItem = () => {
  let { id } = useParams();
  const { repository, fetchMore } = useRepository({ id, first: 8 });

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  const  reviews  = repository.reviews;

  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];
  
  const onEndReach = () => {
    fetchMore();
  };


  return (
    <>
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item = {repository} />}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.listContainer}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
    </>
  );
};

export default SingleRepositoryItem;