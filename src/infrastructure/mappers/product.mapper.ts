import {API_URL} from '../../config/api/tesloApi';
import type {Product} from '../../domain/entities/product';
import type {TesloProductsResponse} from '../interfaces/teslo-products.response';

export class ProductMapper {
  static tesloProductToEntity(product: TesloProductsResponse): Product {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      slug: product.slug,
      stock: product.stock,
      sizes: product.sizes,
      gender: product.gender,
      tags: product.tags,
      images: product.images.map(image => `${API_URL}/files/product/${image}`),
    };
  }
}
