import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './presentation/navigation/StackNavigator';

export default function ProductsApp() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
