import React, {useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {Layout, List} from '@ui-kitten/components';
import type {Product} from '../../../domain/entities/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  fetchNextPage: () => void;
}

export default function ProductList({
  products,
  fetchNextPage,
}: ProductListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={ListFooterComponent}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
}

function ListFooterComponent() {
  return <Layout style={styles.listFooterComponentLayout} />;
}

const styles = StyleSheet.create({
  listFooterComponentLayout: {
    height: 150,
  },
});
