import { Image } from 'react-native'

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center',
    },
    loginLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
};

export default function ProfileImage(){
    return (
        <Image 
        style={styles.profileImage}
        source={require('../../assets/Cantier.png')}
        />
    )
}