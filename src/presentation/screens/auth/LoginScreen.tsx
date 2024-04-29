import React, {useState} from 'react';
import {StyleSheet, ScrollView, useWindowDimensions, Alert} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import MyIcon from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface LoginScreenProps
  extends StackScreenProps<RootStackParamList, 'LoginScreen'> {}

export default function LoginScreen({navigation}: LoginScreenProps) {
  const login = useAuthStore(state => state.login);

  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (!form.email || !form.password) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessful) {
      return;
    }

    Alert.alert('Error', 'Invalid credentials');
  };

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
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={styles.input}
          />

          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={password => setForm({...form, password})}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={styles.input}
          />
        </Layout>

        {/* Space */}
        <Layout style={styles.separator10} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={onLogin}
            disabled={isPosting}>
            Login
          </Button>
        </Layout>

        {/* Space */}
        <Layout style={styles.separator50} />

        {/* Info to create new account */}
        <Layout style={styles.registerContainer}>
          <Text>Don't have an account? </Text>

          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
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
  separator10: {
    height: 10,
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
