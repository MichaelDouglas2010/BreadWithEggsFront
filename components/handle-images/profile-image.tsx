import { Image } from 'react-native'
import styles from '../styles'

export default function ProfileImage(){
    return (
        <Image 
        style={styles.profileImage}
        source={require('../../assets/logo.png')}
        />
    )
}