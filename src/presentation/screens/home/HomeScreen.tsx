import React from 'react';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useAuthStore} from '../../store/auth/useAuthStore';

export default function HomeScreen() {
  const logout = useAuthStore(state => state.logout);

  return (
    <Layout style={styles.container}>
      <Text>HomeScreen</Text>

      {/* <Icon name="facebook" /> */}

      <Button onPress={logout} accessoryLeft={<Icon name="log-out-outline" />}>
        <Text>Logout</Text>
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
