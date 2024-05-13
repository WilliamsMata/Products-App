import React, {useState} from 'react';
import {StyleSheet, ScrollView, useWindowDimensions, Alert} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import MyIcon from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface RegisterScreenProps
  extends StackScreenProps<RootStackParamList, 'RegisterScreen'> {}

export default function RegisterScreen({navigation}: RegisterScreenProps) {
  const register = useAuthStore(state => state.register);

  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (!form.email || !form.password || !form.fullName) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await register(form);
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
            paddingTop: height * 0.3,
          }}>
          <Text category="h1">Create account</Text>
          <Text>Please, create an account to continue</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={styles.inputsContainer}>
          <Input
            value={form.fullName}
            onChangeText={fullName => setForm({...form, fullName})}
            placeholder="Full Name"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={styles.input}
          />

          <Input
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={styles.input}
          />

          <Input
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
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
            Create account
          </Button>
        </Layout>

        {/* Space */}
        <Layout style={styles.separator50} />

        {/* Info to create new account */}
        <Layout style={styles.registerContainer}>
          <Text>Already have an account? </Text>

          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}>
            Login
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
