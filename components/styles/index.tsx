import { Dimensions, StyleSheet } from "react-native"

const { width, height } = Dimensions.get('screen')
const minSize = Math.min(width, height)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#155F82',
        padding: 20,
    },
    loginLogo: {
        width: minSize * 0.5,
        height: minSize * 0.5,
        alignSelf: 'center'
    },
    loginLabel: {
        marginTop: 20,
        color: 'white',
        fontSize: 15,
    },
    loginInput: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#104861',
        alignSelf: 'center',
        minWidth: minSize * 0.3,
        borderWidth: 2,
        borderColor: 'black',
    },

    homeMenu: {
        marginTop: 40,
        borderRadius: 15,
        backgroundColor: '#104861',
        alignSelf: 'center',
        width: width * 0.9,
        height: height * 0.6,
        borderWidth: 2,
    },
    homeButton: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#155F82',
        alignSelf: 'center',
        justifyContent: 'center',
        width: width * 0.85,
        height: height * 0.07
    },

    profileBox: {
        flexDirection: 'row',
        marginBottom: 5,
        paddingBottom: 5,
        paddingTop: 5,
        alignItems: 'center',
        borderRadius: 10,

    },
    profileImage: {
        width: minSize * 0.2,
        height: minSize * 0.2,
    },
    profileLabel: {
        marginTop: 5,
        color: 'white',
        fontSize: 15,
    },

})

export default styles