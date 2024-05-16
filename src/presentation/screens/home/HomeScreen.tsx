import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import ProductList from '../../components/products/ProductList';

export default function HomeScreen() {
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    queryFn: async params => {
      console.log(params);
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
    <MainLayout title="TesloShop - Products" subTitle="Welcome to TesloShop">
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList products={products} fetchNextPage={fetchNextPage} />
      )}
    </MainLayout>
  );
}
