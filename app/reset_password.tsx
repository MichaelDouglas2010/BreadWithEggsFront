import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../helpers/axios';
import styles from '../components/styles';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;

  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!token.trim() || !newPassword.trim()) {
      Alert.alert('Atenção', 'Token e nova senha são obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/user/reset-password', { token, newPassword });
      Alert.alert('Sucesso!', 'Sua senha foi redefinida. Por favor, faça o login novamente.');
      router.replace('/'); // Redireciona para a tela de login
    } catch (error) {
        const errorMessage = (error as any).response?.data?.error || 'Não foi possível redefinir a senha.';
        Alert.alert('Erro', errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginLabel}>Redefinir Senha</Text>
      <Text style={{color: 'white', textAlign: 'center', marginBottom: 20}}>Para: {email}</Text>
      
      <TextInput
        style={styles.loginInput}
        placeholder="Cole o token do console aqui"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.loginInput}
        placeholder="Digite sua nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Button 
        mode='contained' 
        style={styles.loginButton} 
        onPress={handleReset}
        loading={isLoading}
        disabled={isLoading}
      >
        Redefinir Senha
      </Button>
      <Button 
        mode='text' 
        style={{marginTop: 10}} 
        onPress={() => router.back()}
      >
        Voltar
      </Button>
    </View>
  );
}