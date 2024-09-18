import {useEffect} from 'react';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const useNetwork = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'Network Error',
          'It looks like you are disconnected from the network. Please check your Wi-Fi or mobile data.',
          [{text: 'OK'}],
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};

export default useNetwork;
