import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from "react-router-native";
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';



const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;



export const RepositoryListContainer = ({ repositories, refetch, onEndReach }) => {
  const [selectedQuery, setSelectedQuery] = useState();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const onChangeSearch = query => setSearchQuery(query);

  let history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <Pressable onPress={() => { history.push(`/${item.id}`); }} >
      <RepositoryItem item={item} />
    </Pressable>
  );

  useEffect(() => {
    switch (selectedQuery) {
      case 'LATEST':
        refetch({ orderBy: "CREATED_AT", orderDirection: "DESC" });
        break;
      case 'HIGHEST_RATED':
        refetch({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
        break;
      case 'LOWEST_RATED':
        refetch({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
        break;
      default: break;
    }
  }, [selectedQuery]);

  useEffect(() => {
    refetch({ searchKeyword: debouncedQuery   });
  }, [debouncedQuery]);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <Picker
            selectedValue={selectedQuery}
            onValueChange={(itemValue) =>
              setSelectedQuery(itemValue)
            }>
            <Picker.Item label="Latest repositories" value="LATEST" />
            <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
            <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
          </Picker>
        }
      />
    </>
  );
};


const RepositoryList = () => {
  const { repositories, refetch, fetchMore } = useRepositories({
    first:8
  });

  const onEndReach = () => {
    console.log('reached end');
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories}
      refetch={refetch}
      onEndReach={onEndReach}
    />
  );
};


export default RepositoryList;