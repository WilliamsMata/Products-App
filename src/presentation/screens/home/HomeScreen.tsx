import React from 'react';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
    <Layout style={styles.container}>
      <Text>HomeScreen</Text>

      {/* <Icon name="facebook" /> */}

      <Button accessoryLeft={<Icon name="facebook" />}>
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
