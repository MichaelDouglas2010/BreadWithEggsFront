import { Dimensions, StyleSheet } from "react-native"

const {width, height} = Dimensions.get('screen')
const minSize = Math.min(width, height)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#155F82',
        padding: 20,
      },
      loginLabel: {
        marginTop: 20,
        color: 'white'
      },
      loginInput: {
        marginTop: 10,
        borderColor: 'gray',
      },
      loginButton: {
        marginTop: 20,
        backgroundColor: '#104861',
        alignSelf: 'center',
        minWidth: minSize*0.3
      },

})

export default styles