import { View, Text } from 'react-native'
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