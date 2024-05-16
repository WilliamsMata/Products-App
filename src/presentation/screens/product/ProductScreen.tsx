import React, {useRef} from 'react';
import {Text} from '@ui-kitten/components';
import MainLayout from '../../layouts/MainLayout';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../../navigation/StackNavigator';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {useQuery} from '@tanstack/react-query';

// type of product screen extends RootStackParamList
interface ProductScreenProps
  extends StackScreenProps<RootStackParamList, 'ProductScreen'> {}

export default function ProductScreen({route}: ProductScreenProps) {
  const productIdRef = useRef(route.params.productId);
  const productId = productIdRef.current;

  const {data: product, isLoading} = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  if (isLoading || !product) {
    return <MainLayout title="Loading..." />;
  }

  return (
    <MainLayout title="Product" subTitle={`Price: ${product.price}`}>
      <Text>{product.title}</Text>
    </MainLayout>
  );
}
