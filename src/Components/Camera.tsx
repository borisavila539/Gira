import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IconCamera } from "../Constants/BottomTab";
import { cameraInterface } from "../Interfaces/Camera";

const ModalCameraUpload = ({modalVisible,onRequestCloseImage,OnPressUploadImage,imagen,modalCameraUpload,onRequestCloseSelectUploadImage,onPressOut,onPressCameraUpload,OnPressUpLoadImage,onPressModalCameraUpload,modalImage}:cameraInterface) => {
    return (
        <View style={styles.containerImage}>
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onRequestCloseImage}>
                <View style={styles.modal}>
                    <Pressable style={styles.hideimage} onPress={OnPressUploadImage}>
                        <Image source={{ uri: 'data:image/jpeg;base64,' + imagen }} style={styles.imageModal} />
                    </Pressable>
                </View>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={modalCameraUpload} onRequestClose={onRequestCloseSelectUploadImage}>
                <Pressable style={styles.modal} onPress={onPressOut}>
                    <View style={styles.containerIconModal}>
                        <View style={styles.containerIconItem}>
                            <Pressable style={{ width: '100%' }} onPress={onPressCameraUpload} >
                                <View style={styles.button}>
                                    <FontAwesome5 name="camera-retro" size={IconCamera} color={'#1A4D2E'} />
                                    <Text style={styles.textFoto}>Tomar Foto</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.containerIconItem}>
                            <Pressable style={{ width: '100%' }} onPress={OnPressUpLoadImage} >
                                <View style={styles.button}>
                                    <FontAwesome5 name="file-upload" size={IconCamera} color={'#1A4D2E'} />
                                    <Text style={styles.textFoto}>Subir Foto</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            <View style={styles.containerIcon}>
                <View style={styles.containerIconItem}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={onPressModalCameraUpload} >
                        <View style={styles.button}>
                            <FontAwesome5 name="camera-retro" size={IconCamera} color={'#1A4D2E'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {
                imagen &&
                <Pressable onPress={modalImage}>
                    <Image source={{ uri: 'data:image/jpeg;base64,' + imagen }} style={styles.image} />
                </Pressable>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    containerImage: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: '#30475E',
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    modal: {
        backgroundColor: '#00000099',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    hideimage: {
        flex: 1,
        borderWidth: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    imageModal: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    containerIconModal: {
        width: '80%',
        maxWidth: 500,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    containerIconItem: {
        flex: 1,
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    textFoto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A4D2E',
        //fontFamily: 'sans-serif'
    },
    containerIcon: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    image: {
        width: 300,
        height: 400,
        marginBottom: 10,
        resizeMode: 'contain',
    },
})

export default ModalCameraUpload;