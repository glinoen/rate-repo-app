import  { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = ( variables ) => {

  const { data, error, loading, fetchMore, refetch, ...result } = useQuery(GET_REPOSITORIES,
    { variables,
      fetchPolicy: 'cache-and-network' });

  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { 
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    error,
    loading,
    refetch,
    ...result
  };
};

export default useRepositories;