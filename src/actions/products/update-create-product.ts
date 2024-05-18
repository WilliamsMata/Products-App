import {isAxiosError} from 'axios';
import tesloApi from '../../config/api/tesloApi';
import type {Product} from '../../domain/entities/product';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = Number(product.stock);
  product.price = Number(product.price);

  if (product.id) {
    return updateProduct(product);
  }

  throw new Error('Not implemented');
};

const updateProduct = async (product: Partial<Product>) => {
  console.log({product});

  const {id, images = [], ...rest} = product;

  try {
    const preparedImages = prepareImages(images);

    console.log({preparedImages});

    const {data} = await tesloApi.patch(`/products/${id}`, {
      images: preparedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw new Error('Error updating product');
  }
};

const prepareImages = (images: string[]) => {
  // TODO: Check files

  return images.map(image => image.split('/').pop);
};
