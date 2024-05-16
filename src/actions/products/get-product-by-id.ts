import tesloApi from '../../config/api/tesloApi';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';
import type {Product} from '../../domain/entities/product';
import type {TesloProductsResponse} from '../../infrastructure/interfaces/teslo-products.response';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const {data} = await tesloApi.get<TesloProductsResponse>(`/products/${id}`);

    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting product by id: ${id}`);
  }
};
