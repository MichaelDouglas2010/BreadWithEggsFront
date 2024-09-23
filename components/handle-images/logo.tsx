import { Image, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native'

const {width, height} = Dimensions.get('window')
const size = Math.min(width, height)*0.3

const styles = StyleSheet.create({
    logo:{
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
})

export default function Logo(){
    return (
        <Image 
        style={styles.logo}
        source={require('../../assets/logo.png')}
        />
    )
}