import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';

export default function HomeScreen() {
  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <Layout style={styles.container}>
      <Text>{JSON.stringify(products, null, 2)}</Text>
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
