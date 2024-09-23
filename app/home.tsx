import { View, Text } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { Button } from 'react-native-paper'
import { router } from 'expo-router'
import ProfileImage from '../components/handle-images/profile-image'

export default function Home() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <ProfileImage/>
        <View>
        <Text style={styles.profileLabel}>{user.name}</Text>
        <Text style={styles.profileLabel}>{user.team}</Text>
        </View>
      </View>
      <View style={styles.homeMenu}>
        <View style={{ marginBottom: 15 }} />

        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/')}>Consultar Equipamento</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/')}>Inserir Entrada / Saída</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/')}>Cadastro de Equipamentos</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/')}>Relatórios</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/')}>Sobre</Button>

      </View>
    </View>
  )
}