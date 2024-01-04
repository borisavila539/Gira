import { StackScreenProps } from "@react-navigation/stack";
import { FC, useEffect, useState } from "react";
import { RootStackParams } from "../Navigation/Navigation";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TextInputContainer from "../Components/TextInputContainer";
import { ObjectHeigth } from "../Constants/Texto";
import Buttons from "../Components/Buttons";
import MyAlert from "../Components/MyAlert";
import { ReqRequestApiAmazon } from "../Api/API";
import axios from "axios";
import { APIAmazon } from "../Constants/Api";

type props = StackScreenProps<RootStackParams, 'CrearCuentaScreen'>
const CrearCuentaScreen: FC<props> = ({ navigation }) => {
    const [nombre, setNombre] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [pass1, SetPass1] = useState<string>('')
    const [pass2, SetPass2] = useState<string>('')
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [creado, setCreado] = useState<boolean>(false)
    const crearCuenta = async () => {
        let message: string = ''

        if (nombre.length === 0) {
            message = 'nombre completo'
        } else if (user.length === 0) {
            message = 'usuario'
        } else if (pass1.length === 0) {
            message = 'contraseña'
        }
        else if (pass2.length === 0) {
            message = 'confirmacion de contraseña'
        }

        if (message.length > 0) {
            setMensajeAlerta('Debe ingresar su ' + message)
            setShowMensajeAlerta(true)
            setTipoMensaje(false)
        } else if (pass1 !== pass2) {
            setMensajeAlerta('contraseñas no coinciden')
            setShowMensajeAlerta(true)
            setTipoMensaje(false)
        } else {
            let credenciales = {
                nombre: nombre,
                apellido: 'Temp',
                telefono: '00',
                email: 'test@outlook.com',
                usuario:user,
                password: pass1,
                web: false,
                movil: true,
                paisid: 1,
                tipoContratoId: 1,
                cargoId: 2
            }
            await axios.post<any>(`${APIAmazon}web/usuario`, credenciales, { headers: { "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb3ZpbCI6dHJ1ZSwicGFpc0lkIjoyLCJ1c3VhcmlvSWQiOjEsIndlYiI6dHJ1ZX0.W690A2NMXnrtGxITPhAUaA-sDjJstNd8g2NNqmgLzis' } }).then(resp=>{
                console.log(resp)
                setMensajeAlerta('acceptado')
                setShowMensajeAlerta(true)
                setTipoMensaje(true)
                setCreado(true)
            }).catch(err=>{
                console.log('catch2')

                console.log(err)
                setMensajeAlerta('err')
                setShowMensajeAlerta(true)
                setTipoMensaje(false)
            })
            

            
        }
    }
    useEffect(()=>{
        if(!showMensajeAlerta && creado){
            navigation.goBack();
        }
    },[showMensajeAlerta])
    return (
        <View style={style.container}>
            <Text style={{ color: '#fff', fontSize: 30, marginBottom: 20, fontWeight: "bold" }}>Crear cuenta</Text>

            <View style={style.form}>
                <ScrollView style={{ height: '92%' }} showsVerticalScrollIndicator={false}>
                    <TextInputContainer
                        title="Nombre Completo"
                        height={ObjectHeigth}
                        placeholder={'Nombre completo'}
                        tecladoNUm={false}
                        editable={true}
                        onchangeText={(value) => setNombre(value)}
                        value={nombre}
                    />
                    <TextInputContainer
                        title="Usuario"
                        height={ObjectHeigth}
                        placeholder={'usuario'}
                        tecladoNUm={false}
                        editable={true}
                        onchangeText={(value) => setUser(value)}
                        value={user}
                    />
                    <TextInputContainer
                        title="Contraseña"
                        height={ObjectHeigth}
                        placeholder={'contraseña'}
                        tecladoNUm={false}
                        editable={true}
                        onchangeText={(value) => SetPass1(value)}
                        value={pass1}
                    />
                    <TextInputContainer
                        title="Confirme Contraseña"
                        height={ObjectHeigth}
                        placeholder={'contraseña'}
                        tecladoNUm={false}
                        editable={true}
                        onchangeText={(value) => SetPass2(value)}
                        value={pass2}
                    />
                    <View style={{ width: '100%', marginTop: 15 }}>
                        <Buttons
                            title={"Crear Cuenta"}
                            onPressFunction={crearCuenta}
                            disabled={false}
                        />
                    </View>

                </ScrollView>
            </View>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#069A8E',
        alignItems: "center",
        justifyContent: "center"
    },
    form: {
        width: '80%',
        maxWidth: 500,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,

        height: '50%'
    }
})

export default CrearCuentaScreen;