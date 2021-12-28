import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(
      `${this.namespace}:auth`,
    );

    return token ? JSON.parse(token) : undefined;
  }

  async setAccessToken(accessToken) {
    console.log('*autstorage.js**', accessToken);
    await AsyncStorage.setItem(
      `${this.namespace}:auth`,
      JSON.stringify(accessToken),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;