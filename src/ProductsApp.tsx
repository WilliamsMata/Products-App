import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './presentation/navigation/StackNavigator';
import AuthProvider from './presentation/providers/AuthProvider';

export default function ProductsApp() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const theme = isDarkTheme ? eva.dark : eva.light;
  const backgroundColor = isDarkTheme
    ? theme['color-basic-800']
    : theme['color-basic-100'];

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: isDarkTheme,
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
          }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
