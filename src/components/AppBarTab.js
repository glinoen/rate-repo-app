import React from 'react';
import { View } from 'react-native';
import Text from './Text';
import { Link } from "react-router-native";

const AppBarTab = ({tabName, link}) => {
  return( 
  <View>
    <Link to={link}>
      <Text style={{ color: 'white', marginHorizontal:10 }} fontWeight="bold" fontSize="subheading">{tabName}</Text>
    </Link>
  </View>
  );
};

export default AppBarTab;