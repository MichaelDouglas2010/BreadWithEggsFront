import { View, Text, StyleSheet } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'

export default function Home() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.loginLabel}>Bem-vindo, {user.name}!</Text>
    </View>
  )
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  }
})*/