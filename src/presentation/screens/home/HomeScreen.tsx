import React from 'react';
import {StyleSheet} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import type {RootStackParamList} from '../../navigation/StackNavigator';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import ProductList from '../../components/products/ProductList';
import FAB from '../../components/ui/FAB';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    queryFn: async params => {
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
  });

  const products = data ? data.pages.flat() : [];

  return (
    <>
      <MainLayout title="TesloShop - Products" subTitle="Welcome to TesloShop">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList products={products} fetchNextPage={fetchNextPage} />
        )}
      </MainLayout>

      <FAB
        style={styles.fab}
        iconName="plus-outline"
        onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});
