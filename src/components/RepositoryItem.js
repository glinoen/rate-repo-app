import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';

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
    paddingLeft: 10,
    paddingRight: 10
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
  button: {
    backgroundColor: '#b00000',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    margin: 10
}

});
 
const Count = ({ label, count }) => {
  let newCount = count;
  if( count >= 1000) {
    newCount = Math.round((count / 1000) * 10) / 10;
    newCount = newCount.toString().concat('k');
  }
  
  return (
    <View style={styles.numbersDetails}>
      <Text testID="countedNumber" fontWeight="bold" style={{ textAlign: 'center' }}>{newCount} </Text>
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
        <Text testID="repoTitle" fontWeight="bold">{item.fullName}</Text>
        <Text testID="repoDescription" color="textSecondary">{item.description}</Text>
        <View style={styles.languageStyle}>
          <Text testID="repoLanguage" style={styles.languangeText}>{item.language}</Text>
        </View>
      </View>
    </View>
    <View style={styles.numbers}>
      <Count label='Stars' count={item.stargazersCount}></Count>
      <Count label='Forks' count={item.forksCount}></Count>
      <Count label='Reviews' count={item.reviewCount}></Count>
      <Count label='Rating' count={item.ratingAverage}></Count>
    </View>
    {item.url ? 
      <Pressable  onPress={() => {Linking.openURL(item.url);}}>
        <Text style={styles.button} fontWeight="bold" fontSize="subheading">Open in Github</Text>
      </Pressable> :
      null
    }
  </View>
);

export default RepositoryItem;