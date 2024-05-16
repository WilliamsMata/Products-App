import React, {useRef} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import MainLayout from '../../layouts/MainLayout';
import type {RootStackParamList} from '../../navigation/StackNavigator';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Size} from '../../../domain/entities/product';
import MyIcon from '../../components/ui/MyIcon';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

// type of product screen extends RootStackParamList
interface ProductScreenProps
  extends StackScreenProps<RootStackParamList, 'ProductScreen'> {}

export default function ProductScreen({route}: ProductScreenProps) {
  const productIdRef = useRef(route.params.productId);
  const productId = productIdRef.current;

  const theme = useTheme();

  const {data: product, isLoading} = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  if (isLoading || !product) {
    return <MainLayout title="Loading..." />;
  }

  return (
    <MainLayout title="Product" subTitle={`Price: ${product.price}`}>
      <ScrollView style={styles.scrollView}>
        <Layout>
          <FlatList
            data={product.images}
            horizontal
            keyExtractor={item => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <FadeInImage uri={item} style={styles.imageList} />
            )}
          />
        </Layout>

        <Layout style={styles.container1}>
          <Input label="Title" value={product.title} style={styles.input} />
          <Input label="Slug" value={product.slug} style={styles.input} />
          <Input
            label="Description"
            value={product.description}
            multiline
            numberOfLines={5}
            style={styles.input}
          />
        </Layout>

        <Layout style={styles.container2}>
          <Input
            label="Price"
            value={product.price.toString()}
            style={styles.input2}
          />
          <Input
            label="Stock"
            value={product.stock.toString()}
            style={styles.input2}
          />
        </Layout>

        <ButtonGroup
          style={styles.buttonGroup}
          size="small"
          appearance="outline">
          {sizes.map((size, index) => (
            <Button
              key={index}
              style={[
                styles.sizesButton,
                {
                  backgroundColor: true
                    ? theme['color-primary-200']
                    : undefined,
                },
              ]}>
              {size}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup
          style={styles.buttonGroup}
          size="small"
          appearance="outline">
          {genders.map((gender, index) => (
            <Button
              key={index}
              style={[
                styles.sizesButton,
                {
                  backgroundColor: true
                    ? theme['color-primary-200']
                    : undefined,
                },
              ]}>
              {gender}
            </Button>
          ))}
        </ButtonGroup>

        <Button
          accessoryLeft={<MyIcon name="save-outline" white />}
          onPress={() => console.log('Save')}
          style={styles.saveButton}>
          Save
        </Button>

        <Layout style={styles.footerSeparator} />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  imageList: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
  },
  container1: {
    marginHorizontal: 10,
  },
  container2: {
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    gap: 10,
  },
  buttonGroup: {
    margin: 2,
    marginTop: 30,
    marginHorizontal: 15,
  },
  sizesButton: {
    flex: 1,
  },
  input: {
    marginVertical: 5,
  },
  input2: {
    flex: 1,
  },
  saveButton: {
    margin: 15,
  },
  footerSeparator: {
    height: 250,
  },
});
