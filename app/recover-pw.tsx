
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import api from '../helpers/axios'; // Verifique o caminho
import styles from '../components/styles'; // Verifique o caminho

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Por favor, insira o seu e-mail.');
      return;
    }
    
    setIsLoading(true);
    try {
      await api.post('/user/request-password-reset', { email });
      Alert.alert(
        'Verifique o Console',
        'Um token de redefinição foi gerado no console do seu servidor backend. Use-o na próxima tela.'
      );
      // Navega para a tela de redefinição, passando o e-mail para conveniência
      router.push({
        pathname: '/reset_password',
        params: { email }
      });
    } catch (error) {
      const errorMessage = (error as any).response?.data?.error || 'Não foi possível solicitar a redefinição.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginLabel}>Recuperar Senha</Text>
      <TextInput
        style={[styles.loginInput, { marginTop: 20 }]}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button 
        mode='contained' 
        style={styles.loginButton} 
        onPress={handleRequestReset}
        loading={isLoading}
        disabled={isLoading}
      >
        Solicitar Redefinição
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