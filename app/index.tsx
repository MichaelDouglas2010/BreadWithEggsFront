import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../context/auth';
import Logo from '../components/handle-images/logo';
import styles from '../components/styles';
import { Link } from 'expo-router';

export default function Login() {
  const { signIn, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View>
        <Text style={styles.loginLabel}>E-mail</Text>
        <TextInput 
          label="E-mail" 
          style={styles.loginInput} 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text style={styles.loginLabel}>Senha</Text>
        <TextInput 
          label="Senha" 
          secureTextEntry={true} 
          style={styles.loginInput} 
          value={password}
          onChangeText={setPassword} 
        />
      </View>

      <Button 
        mode="contained" 
        style={styles.loginButton} 
        onPress={handleLogin}
        loading={isLoading}
        disabled={isLoading}
      >
        Login
      </Button>

      <Link href={'/recover-pw'} style={[styles.loginLabel, { alignSelf: 'center' }]}>
        <Text>Esqueci a minha senha</Text>
      </Link>

      <Link href={'/cadastrar_usuario'} style={{ alignSelf: 'center', marginTop: 24 }}>
        <Button
          mode="outlined"
          style={{ borderColor: '#1a73e8', borderWidth: 1, borderRadius: 8, marginTop: 4, paddingVertical: 10, paddingHorizontal: 16, minWidth: 180 }}
          labelStyle={{ color: '#1a73e8', fontWeight: 'bold', fontSize: 16 }}
        >
          Criar nova conta
        </Button>
      </Link>
    </View>
  );
}
