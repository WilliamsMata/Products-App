import React from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import {FadeInImage} from '../ui/FadeInImage';

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({images}: ProductImagesProps) {
  return (
    <>
      {images.length === 0 ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={styles.imageList}
        />
      ) : (
        <FlatList
          data={images}
          horizontal
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <FadeInImage uri={item} style={styles.imageList} />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageList: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
  },
});
