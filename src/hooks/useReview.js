import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async ({ repoOwnerUsername, repoName, rating, review }) => {
    const ratingToNumber = Number(rating);
    const { data } = await mutate({ variables: { repositoryName: repoName, ownerName: repoOwnerUsername, rating: ratingToNumber, text: review } });
    apolloClient.resetStore();
    return data;
  };

  return [review, result];
};

export default useReview;