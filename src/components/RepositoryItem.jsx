import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 10
  },
  pictureAndDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  details: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  languageStyle: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: "#b00000",
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  languangeText: {
    textAlign: "center",
    color: "white"
  },
  numbers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  numbersDetails: {
    flexDirection: 'column',
    
  },

});
 
const Count = ({ label, count }) => {
  let newCount = count;
  if( count >= 1000) {
    newCount = Math.round((count / 1000) * 10) / 10;
    newCount = newCount.toString().concat('k');
  }
  
  return (
    <View style={styles.numbersDetails}>
      <Text fontWeight="bold" style={{ textAlign: 'center' }}>{newCount} </Text>
      <Text color="textSecondary" style={{ textAlign: 'center' }}>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.pictureAndDetails}>
      <Image
          style={styles.tinyLogo}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
      <View style={styles.details}>
        <Text fontWeight="bold">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        <View style={styles.languageStyle}>
          <Text style={styles.languangeText}>{item.language}</Text>
        </View>
      </View>
    </View>
    <View style={styles.numbers}>
      <Count label='Stars' count={item.stargazersCount}></Count>
      <Count label='Forks' count={item.forksCount}></Count>
      <Count label='Reviews' count={item.reviewCount}></Count>
      <Count label='Rating' count={item.ratingAverage}></Count>
    </View>
  </View>
);

export default RepositoryItem;