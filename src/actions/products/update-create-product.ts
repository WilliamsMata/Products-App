import {isAxiosError} from 'axios';
import tesloApi from '../../config/api/tesloApi';
import type {Product} from '../../domain/entities/product';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  } else {
    return createProduct(product);
  }
};

const prepareImages = async (images: string[]) => {
  const fileImages = images.filter(image => image.startsWith('file://'));
  const currentImages = images.filter(image => !image.startsWith('file://'));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(uploadImage);
    const uploadedImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadedImages);
  }

  return currentImages.map(image => image.split('/').pop());
};

const uploadImage = async (image: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    name: image.split('/').pop(),
    type: 'image/jpeg',
  });

  try {
    const {data} = await tesloApi.post<{image: string}>(
      '/files/product',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data.image;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw new Error('Error uploading image');
  }
};

const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;

  try {
    const preparedImages = await prepareImages(images);

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

const createProduct = async (product: Partial<Product>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We don't need the id
  const {id, images = [], ...rest} = product;

  try {
    const preparedImages = await prepareImages(images);

    const {data} = await tesloApi.post('/products', {
      images: preparedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw new Error('Error creating product');
  }
};
