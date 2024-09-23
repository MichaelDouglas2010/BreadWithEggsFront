import { Image, Dimensions } from 'react-native'
import styles from '../styles'

const {width, height} = Dimensions.get('screen')
const size = Math.min(width, height)*0.5

export default function Logo(){
    return (
        <Image 
        style={styles.loginLogo}
        source={require('../../assets/logo.png')}
        />
    )
}