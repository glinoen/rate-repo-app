import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);

  const review = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    apolloClient.resetStore();
    return data;
  };

  return [review, result];
};

export default useSignUp;