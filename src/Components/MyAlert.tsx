import { Modal, Pressable, StyleSheet, Text, View, } from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons'
import { AlertInterface } from '../Interfaces/AlertInterface';
import { grey,navy } from '../Constants/Colors';
import { FontFamily, TextoPantallas } from '../Constants/Texto';

function MyAlert({ visible, tipoMensaje, mensajeAlerta, onPress }: AlertInterface) {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.constainer}>
                    <Text>
                        <Icon name={tipoMensaje ? 'cloud-done-outline' : 'warning-outline'} size={80} color={tipoMensaje ? 'green' : '#E14D2A'} />
                    </Text>
                    <Text style={styles.text}>
                        {mensajeAlerta}
                    </Text>
                    <Pressable onPress={onPress} style={styles.pressable}>
                        <Text style={[styles.text, { color: grey, marginTop: 0 }]}>Ok</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: '#00000099',
    },
    constainer: {
        width: '80%',
        backgroundColor: grey,
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    text: {
        fontSize: TextoPantallas,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: FontFamily,
        color: navy
    },
    pressable: {
        backgroundColor: '#0078AA',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 15
    }
});

export default MyAlert;