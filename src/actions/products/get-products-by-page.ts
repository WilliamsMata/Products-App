import tesloApi from '../../config/api/tesloApi';
import type {Product} from '../../domain/entities/product';
import type {TesloProductsResponse} from '../../infrastructure/interfaces/teslo-products.response';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

export const getProductsByPage = async (
  page: number,
  limit: number = 20,
): Promise<Product[]> => {
  console.log({page, limit});

  try {
    const {data} = await tesloApi.get<TesloProductsResponse[]>('/products', {
      params: {
        offset: page * limit,
        limit,
      },
    });

    const products = data.map(ProductMapper.tesloProductToEntity);
    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching products');
  }
};
