import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { RootStackParams } from "../Navigation/Navigation";
import HeaderLogout from "../Components/HeaderLogout";
import { useContext, useState } from "react";
import TextInputContainer from "../Components/TextInputContainer";
import { GiraContext } from "../Context/GiraContext";
import { ObjectHeigth } from "../Constants/Texto";
import { CameraOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import ModalCameraUpload from "../Components/Camera";
import Buttons from "../Components/Buttons";
import MyAlert from "../Components/MyAlert";
import { ProveedoresInterface } from "../Interfaces/Proveedores";
import { SolicitudProveedorInterface } from "../Interfaces/SolicitudProveedorInterface";
import { ReqRequestApiAventas } from "../Api/API";

const ProveedorScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const [nombre, setNombre] = useState<string>('');
    const [documentoFiscal, setDocumentoFiscal] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [imagen, setImagen] = useState<string>('');
    const { GiraState } = useContext(GiraContext)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [modalCameraUpload, setmodalCameraUpload] = useState<boolean>(false)
    const [enviando, setEnviando] = useState<boolean>(false)
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');

    const optionsCamera: CameraOptions = {
        mediaType: "photo",
        quality: 0.2,
        includeBase64: true
    }
    const pickImage = async () => {
        launchCamera(optionsCamera, saveImage);
    }
    const upLoadImage = () => {
        launchImageLibrary(optionsCamera, saveImage)
    }
    const saveImage = (resp: ImagePickerResponse) => {
        if (resp.didCancel) return;
        if (!resp.assets) return;
        resp.assets.forEach(element => {
            let image: any = element.base64
            setImagen(image);
            setmodalCameraUpload(false)
        })
    }
    const EnviarSolicitud = async () => {
        setEnviando(true)
        if (nombre === '') {
            alertas('El campo nombre es obligatorio', true, false)
        } else if (documentoFiscal === '') {
            alertas('El campo ' + GiraState.DocumentoFiscal + ' es obligatorio', true, false)
        } else if (descripcion === '') {
            alertas('El campo descripcion es obligatorio', true, false)
        } else if (imagen === '') {
            alertas('La imagen es obligatoria', true, false)
        } else {
            try {
                let data:SolicitudProveedorInterface={
                    usuario: GiraState.UsuarioID,
                    detalle : descripcion,
                    nombre: nombre,
                    rtn: documentoFiscal,
                    imagen: imagen
                }
                await ReqRequestApiAventas.post('Gira/Usuarios',data).then(x=>{
                    alertas('Solicitud enviada',true,true)
                    setDescripcion('')
                    setNombre('')
                    setDocumentoFiscal('')
                    setImagen('')
                })
            } catch (err) {
                alertas('Solicitud no enviada',true,false)

                console.log(err)
            }
        }

        setEnviando(false)
    }

    const alertas = (mensaje: string, show: boolean, tipo: boolean) => {
        setMensajeAlerta(mensaje)
        setShowMensajeAlerta(show)
        setTipoMensaje(tipo)
    }
    return (
        <View>
            <HeaderLogout GoBack={false} navigation={navigation} />

            <ScrollView style={{ height: '92%' }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <TextInputContainer
                            title="Nombre:"
                            height={ObjectHeigth}
                            tecladoNUm={false}
                            editable={true}
                            onchangeText={(value: string) => setNombre(value)}
                            value={nombre} />
                        <TextInputContainer
                            title={GiraState.DocumentoFiscal + ':'}
                            height={ObjectHeigth}
                            tecladoNUm={false}
                            editable={true}
                            onchangeText={(value: string) => setDocumentoFiscal(value)}
                            value={documentoFiscal} />
                        <TextInputContainer
                            title="Descripcion:"
                            height={ObjectHeigth}
                            tecladoNUm={false}
                            editable={true}
                            onchangeText={(value: string) => setDescripcion(value)}
                            value={descripcion}
                            maxlength={300}
                            justify={true} />
                        <ModalCameraUpload
                            modalVisible={modalVisible}
                            onRequestCloseImage={() => setModalVisible(!modalVisible)}
                            OnPressUploadImage={() => setModalVisible(!modalVisible)}
                            imagen={imagen}
                            modalCameraUpload={modalCameraUpload}
                            onRequestCloseSelectUploadImage={() => setmodalCameraUpload(false)}
                            onPressOut={() => setmodalCameraUpload(false)}
                            onPressCameraUpload={pickImage}
                            OnPressUpLoadImage={upLoadImage}
                            onPressModalCameraUpload={() => setmodalCameraUpload(true)}
                            modalImage={() => setModalVisible(false)}
                        />
                        <Buttons title={enviando ? 'Enviando...' : 'Enviar'} disabled={enviando} onPressFunction={EnviarSolicitud} />
                        <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />

                    </View>

                </SafeAreaView>
            </ScrollView>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: "center",
        paddingVertical: 20
    },
    formulario: {
        width: '80%',
        maxWidth: 600,
        justifyContent: "center",
        alignItems: "center"
    }

})

export default ProveedorScreen;