import { Image } from 'react-native'
import styles from '../styles'

export default function Logo(){
    return (
        <Image 
        style={styles.loginLogo}
        source={require('../../assets/logo.png')}
        />
    )
}