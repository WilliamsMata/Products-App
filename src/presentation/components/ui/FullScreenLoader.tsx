import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';

export default function FullScreenLoader() {
  return (
    <Layout style={styles.container}>
      <Spinner size="giant" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
