import React from 'react';
// import {StyleSheet} from 'react-native';
import {Product} from '../../../domain/entities/product';
import {Text} from '@ui-kitten/components';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  return <Text>{product.id}</Text>;
}

// const styles = StyleSheet.create({});
