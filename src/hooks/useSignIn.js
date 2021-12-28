import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { 
        credentials: { username, password } 
      },
    });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;