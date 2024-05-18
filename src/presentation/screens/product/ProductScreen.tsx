import React, {useRef} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import MainLayout from '../../layouts/MainLayout';
import type {RootStackParamList} from '../../navigation/StackNavigator';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Size} from '../../../domain/entities/product';
import MyIcon from '../../components/ui/MyIcon';
import {Formik} from 'formik';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

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
    <Formik initialValues={product} onSubmit={values => console.log(values)}>
      {({values, handleChange, handleSubmit, setFieldValue}) => (
        <MainLayout title={values.title} subTitle={`Price: ${values.price}`}>
          <ScrollView style={styles.scrollView}>
            <Layout>
              <FlatList
                data={values.images}
                horizontal
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <FadeInImage uri={item} style={styles.imageList} />
                )}
              />
            </Layout>

            <Layout style={styles.container1}>
              <Input
                label="Title"
                style={styles.input}
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                style={styles.input}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />
              <Input
                label="Description"
                multiline
                numberOfLines={5}
                style={styles.input}
                value={values.description}
                onChangeText={handleChange('description')}
              />
            </Layout>

            <Layout style={styles.container2}>
              <Input
                label="Price"
                style={styles.input2}
                value={values.price.toString()}
                onChangeText={handleChange('price')}
              />
              <Input
                label="Stock"
                style={styles.input2}
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
              />
            </Layout>

            <ButtonGroup
              style={styles.buttonGroup}
              size="small"
              appearance="outline">
              {sizes.map((size, index) => (
                <Button
                  key={index}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={[
                    styles.sizesButton,
                    {
                      backgroundColor: values.sizes.includes(size)
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
                  onPress={() => setFieldValue('gender', gender)}
                  style={[
                    styles.sizesButton,
                    {
                      backgroundColor: values.gender.startsWith(gender)
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
              onPress={() => handleSubmit()}
              style={styles.saveButton}>
              Save
            </Button>

            <Text>{JSON.stringify(values, null, 2)}</Text>

            <Layout style={styles.footerSeparator} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
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
