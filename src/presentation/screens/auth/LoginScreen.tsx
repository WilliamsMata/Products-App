import React from 'react';
import {StyleSheet, ScrollView, useWindowDimensions} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';

export default function LoginScreen() {
  const {height} = useWindowDimensions();

  return (
    <Layout style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Layout
          style={{
            paddingTop: height * 0.35,
          }}>
          <Text category="h1">Login</Text>
          <Text>Please, login to continue</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={styles.inputsContainer}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
          />
        </Layout>

        {/* Space */}
        <Layout style={styles.separator20} />

        {/* Button */}
        <Layout>
          <Button onPress={() => console.log('login')}>Login</Button>
        </Layout>

        {/* Space */}
        <Layout style={styles.separator50} />

        {/* Info to create new account */}
        <Layout style={styles.registerContainer}>
          <Text>Don't have an account? </Text>

          <Text
            status="primary"
            category="s1"
            onPress={() => console.log('navigate to register')}>
            Register
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 40,
  },
  inputsContainer: {
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
  separator20: {
    height: 20,
  },
  separator50: {
    height: 50,
  },
  registerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
