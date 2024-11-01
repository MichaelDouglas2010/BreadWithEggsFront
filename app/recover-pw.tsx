import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { router } from 'expo-router'

export default function RecoverPw() {
    const { user } = useAuth()

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.loginLabel}>Esqueci minha senha!</Text>
                <Text style={[styles.loginLabel, {marginTop: 5, marginBottom: 40}]}>Padrão teste: admin, 123</Text>
            </View>
            <Button mode='contained' style={styles.loginButton} onPress={() => router.push('/')}>Okay</Button>
        </View>
    )
}