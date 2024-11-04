import { Text, View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../context/auth'
import Logo from '../components/handle-images/logo'
import styles from '../components/styles'
import { Link, useFocusEffect } from 'expo-router'
import React from 'react'

export default function Login() {
  const { user, handleLogin, setUser } = useAuth()
  useFocusEffect(
    React.useCallback(() => {
      setUser({ email: '', password: '', name: '', team: '' })
    }, [])
  )

  return (
    <View style={styles.container}>

      <Logo />

      <View>
        <Text style={styles.loginLabel}>Usuário</Text>
        <TextInput label="Usuário" style={styles.loginInput} onChangeText={text => setUser({ ...user, email: text })} />
      </View>

      <View>
        <Text style={styles.loginLabel}>Senha</Text>
        <TextInput label="Senha" secureTextEntry={true} style={styles.loginInput} onChangeText={text => setUser({ ...user, password: text })} />
      </View>

      <Button mode="contained" style={styles.loginButton} onPress={handleLogin}>Login</Button>

      <Link href={'recover-pw'} style={[styles.loginLabel, { alignSelf: 'center' }]}>
        <Text>Recuperar senha</Text>
      </Link>

    </View>
  )
}