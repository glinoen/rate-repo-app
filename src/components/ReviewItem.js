import React from "react";
import { StyleSheet, View, Pressable, Alert } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import { format } from 'date-fns';
import useRemoveReview from "../hooks/useRemoveReview";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    marginTop: 10
  },
  topContainer: {
    backgroundColor: "white",
  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  usernameDateText: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    flexShrink: 1
  },
  rating: {
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 25,
    alignSelf: "flex-start",
    height: 50,
    width: 50,
    justifyContent: 'center'
  },
  ratingText: {
    textAlign: "center",
    color: "red"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonDelete: {
    backgroundColor: '#b00000',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    margin: 10
  },
  buttonLink: {
    backgroundColor: '#05ff44',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    margin: 10
  },

});


const ReviewItem = ({ review, authorized }) => {
  const [removeReview] = useRemoveReview();
  
  const handleRemove = () => {
    Alert.alert(
      "Removing a review",
      "Are you certain?",
      [
        {
          text: "No",
          onPress: () => console.log("No"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await removeReview({ id: review.id });
            } catch (e) {
              console.log(e);
            }
          }
        },
      ]
    );    
  };
  return(
    <View style={styles.topContainer}>
      <View style={styles.reviewContainer}>
        <View style={styles.rating}>
          <Text fontWeight="bold" style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.usernameDateText}>
          {authorized ? 
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          :
          <Text fontWeight="bold">{review.user.username}</Text>
          }
          <Text color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
        {authorized ?
          <View style={styles.buttonContainer}>
            <Pressable>
              <Link to={`/${review.repository.id}`}>
                <Text fontWeight="bold" style={styles.buttonLink}>
                  Go to repository
                </Text>
              </Link>
            </Pressable>
            <Pressable onPress={() => handleRemove()}>
              <View>
                <Text fontWeight="bold" style={styles.buttonDelete}>
                  Delete review
                </Text>
              </View>
            </Pressable>
          </View> : null}
    </View>
  );
};

export default ReviewItem;