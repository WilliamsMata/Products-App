import tesloApi from '../../config/api/tesloApi';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';
import {Gender, type Product} from '../../domain/entities/product';
import type {TesloProductsResponse} from '../../infrastructure/interfaces/teslo-products.response';

const emptyProduct: Product = {
  id: '',
  title: 'New product',
  slug: '',
  description: '',
  price: 0,
  stock: 0,
  images: [],
  gender: Gender.Unisex,
  sizes: [],
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') {
    return emptyProduct;
  }

  try {
    const {data} = await tesloApi.get<TesloProductsResponse>(`/products/${id}`);

    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting product by id: ${id}`);
  }
};
