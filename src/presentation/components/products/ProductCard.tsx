import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Product} from '../../../domain/entities/product';
import {Card, Text} from '@ui-kitten/components';
import {FadeInImage} from '../ui/FadeInImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
  return (
    <Card style={styles.card}>
      {product.images.length > 0 ? (
        <FadeInImage uri={product.images[0]} style={styles.image} />
      ) : (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={styles.notFoundImage}
        />
      )}

      <Text numberOfLines={2} style={styles.text} category="h6">
        {product.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 3,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  notFoundImage: {
    width: '100%',
    height: 200,
  },
  text: {
    textAlign: 'center',
  },
});

const areProductsEqual = (
  prevProps: ProductCardProps,
  nextProps: ProductCardProps,
) => {
  // Deep comparison to check for changes in product properties
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.title === nextProps.product.title &&
    JSON.stringify(prevProps.product.images) ===
      JSON.stringify(nextProps.product.images)
  );
};

export default React.memo(ProductCard, areProductsEqual);
