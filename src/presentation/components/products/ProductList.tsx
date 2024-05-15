import React from 'react';
import type {Product} from '../../../domain/entities/product';
import {Layout, List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];

  // todo: Fetch next page
}

export default function ProductList({products}: ProductListProps) {
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={ListFooterComponent}
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
