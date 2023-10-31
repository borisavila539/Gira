import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../Navigation/Navigation";
import { FC, useContext, useReducer, useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { placeholderText } from "../Constants/Colors";
import Buttons from "../Components/Buttons";
import { LoginInterface } from "../Interfaces/LoginInterface";
import { ReqRequestApiAventas } from "../Api/API";
import { ResponseLogin } from "../Interfaces/ResponseLogin";
import MyAlert from "../Components/MyAlert";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { IconSelect } from "../Constants/BottomTab";
import { GiraContext } from "../Context/GiraContext";
import { DocumentoFiscal, MonedaInterface } from "../Interfaces/DocumentoFiscal";

type props = StackScreenProps<RootStackParams, 'LoginScreen'>

const LoginScreen: FC<props> = ({ navigation }) => {
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [enviando, setEnviando] = useState<boolean>(false)
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [viewPassword, setViewPassword] = useState<boolean>(true);
    const { 
        changeUsuarioID, 
        changeNombre, 
        changeEmpresa, 
        changeDocumentoFiscal ,
        changeMoneda,
        changeMonedaAbriaviacion,
        changeLogeado
    } = useContext(GiraContext)

    const onPressLogin = async () => {
        setEnviando(true)
        try {
            const credenciales: LoginInterface = { UserAccount: user, Password: password }
            await ReqRequestApiAventas.post<ResponseLogin>('authentication', credenciales)
                .then(x => {
                    if (x.data.Message === 'Ok') {
                        changeUsuarioID(x.data.Data.Usuario.IdUsuario)
                        changeNombre(x.data.Data.Nombre)
                        changeEmpresa(x.data.Data.Empresa.toUpperCase())
                        try {
                            ReqRequestApiAventas.get<DocumentoFiscal[]>('Gira/Empresa/' + x.data.Data.Empresa.toUpperCase())
                                .then(x => {
                                    changeDocumentoFiscal(x.data[0].documento)
                                })

                        } catch (err) {

                        }

                        try {
                            ReqRequestApiAventas.get<MonedaInterface>('Gira/MaestroMoneda/' + x.data.Data.Empresa.toUpperCase())
                            .then(x=>{
                                changeMoneda(x.data.Moneda)
                                changeMonedaAbriaviacion(x.data.Abreviacion)
                            })
                        } catch (err) {

                        }
                        changeLogeado(true)
                        //navigation.navigate("TabNavigation")
                    } else {
                        setMensajeAlerta(x.data.Message)
                        setShowMensajeAlerta(true)
                        setTipoMensaje(true)
                    }
                }
                )

        } catch (err) {
            setMensajeAlerta('Usuario o contraseña incorrecta...')
            setShowMensajeAlerta(true)
            setTipoMensaje(false)
        }
        setEnviando(false)
    }
    return (
        <View style={{ flex: 1 }}>

            <View style={style.container}>
                <View style={style.imageContainer} >
                    <Image source={require('../Assets/Logo.png')} style={style.imagen} />
                </View>

                <View style={style.containerinputs}>
                    <View style={style.textInputAlign}>
                        <FontAwesome5Icon
                            name='user'
                            style={style.icons}
                            solid />
                        <TextInput
                            style={style.input}
                            placeholder="usuario"
                            placeholderTextColor={placeholderText}
                            value={user}
                            onChangeText={(value) => setUser(value)} />
                    </View>
                    <View style={style.textInputAlign}>
                        <FontAwesome5Icon
                            name='key'
                            style={style.icons}
                        />
                        <TextInput
                            style={style.input}
                            placeholder="contraseña"
                            placeholderTextColor={placeholderText}
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                            secureTextEntry={viewPassword} />
                        <Pressable onPress={() => setViewPassword(!viewPassword)}>
                            <FontAwesome5Icon
                                name={viewPassword ? 'eye' : 'eye-slash'}
                                style={style.icons}
                                solid
                            />
                        </Pressable>
                    </View>
                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                        <Buttons
                            title={enviando ? "Iniciando..." : "Iniciar Sesion"}
                            onPressFunction={onPressLogin}
                            disabled={enviando}
                        />
                    </View>
                </View>
            </View>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        backgroundColor: '#069A8E'
    },
    imageContainer: {
        width: '100%',
        height: '50%',
        maxHeight: 500,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomEndRadius: 30,
        marginBottom: 30
    },
    imagen: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    containerinputs: {
        width: '80%',
        height: '30%',
        justifyContent: 'space-around',
        maxWidth: 600,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFF8F3',
        borderRadius: 20,
    },
    input: {
        flex: 3,
        padding: 5,
        marginLeft: 10,
        fontSize: 16,
        color: '#005555',
    },
    textInputAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '20%',
        paddingHorizontal: 3,
        marginBottom: 15,
        backgroundColor: '#A1E3D8',
        maxWidth: 500,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderRadius: 8,
    },
    icons: {
        flex: 0,
        fontSize: IconSelect,
        marginLeft: 5,
        color: '#005555',
    },
});
export default LoginScreen