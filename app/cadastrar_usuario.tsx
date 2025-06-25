import { useState } from 'react'
import { View, Text, TextInput, ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import api from '../helpers/axios'

export default function CadastrarUsuario() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [team, setTeam] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Função simples para validar e-mail
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !team.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.')
      return
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido!')
      return
    }
    setIsLoading(true)
    try {
      let emailExists = false
      try {
        const check = await api.get(`/user/login/${encodeURIComponent(email)}`)
        if (check.data && check.data.email === email) {
          emailExists = true
        }
      } catch (err: any) {
        if (err.response && err.response.status !== 404) {
          throw err
        }
      }
      if (emailExists) {
        Alert.alert('Atenção', 'Este e-mail já está cadastrado!')
        setIsLoading(false)
        return
      }
      await api.post('/user', { name, email, password, team })
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.replace('/'),
        },
      ])
      setName('')
      setEmail('')
      setPassword('')
      setTeam('')
    } catch (e: any) {
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.')
      console.log('Erro ao cadastrar usuário:', e?.response?.data || e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.title}>Cadastrar Usuário</Text>
        <Text style={localStyles.label}>Nome</Text>
        <TextInput
          style={localStyles.input}
          placeholder="Digite o nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <Text style={localStyles.label}>E-mail</Text>
        <TextInput
          style={localStyles.input}
          placeholder="Digite o e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={localStyles.label}>Senha</Text>
        <TextInput
          style={localStyles.input}
          placeholder="Digite a senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={localStyles.label}>Equipe</Text>
        <TextInput
          style={localStyles.input}
          placeholder="Digite a equipe"
          value={team}
          onChangeText={setTeam}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <Button
            mode="contained"
            style={[localStyles.button, { backgroundColor: '#ccc' }]}
            labelStyle={{ color: '#222' }}
            onPress={() => router.replace('/')}
            disabled={isLoading}
          >
            Voltar
          </Button>
          <Button
            mode="contained"
            style={[localStyles.button, { backgroundColor: '#FF6F00' }]}
            labelStyle={{ color: '#fff' }}
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
          >
            Cadastrar
          </Button>
        </View>
        {isLoading && (
          <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 20 }} />
        )}
      </View>
    </ScrollView>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    color: '#111',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 8,
  },
})