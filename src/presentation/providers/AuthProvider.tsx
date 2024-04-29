import {useEffect, type PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../navigation/StackNavigator';
import {useAuthStore} from '../store/auth/useAuthStore';

export default function AuthProvider({children}: PropsWithChildren) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const status = useAuthStore(state => state.status);
  const checkStatus = useAuthStore(state => state.checkStatus);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    }
  }, [status, navigation]);

  return children;
}
