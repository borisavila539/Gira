import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { RootStackParams } from "../Navigation/Navigation";
import HeaderLogout from "../Components/HeaderLogout";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { IconHeader } from "../Constants/BottomTab";
import { ActivityIndicator } from "react-native";
import { ReqRequestApiAventas } from "../Api/API";
import { HistorialInterface } from "../Interfaces/HistorialInterface";
import { useContext, useEffect, useState } from "react";
import { GiraContext } from "../Context/GiraContext";
import MyAlert from "../Components/MyAlert";

const NoSyncScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const { GiraState,changeCatNoSync } = useContext(GiraContext)
    const [noSync, setNosync] = useState<HistorialInterface[]>([])
    const [Page, setPage] = useState<number>(1)
    const [recargar, setRecargar] = useState<boolean>(false)
    const [idSync, setIdSync] = useState<number>(0);
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [recargando, setRecargando] = useState<boolean>(false);


    const getNoSync = async () => {
        setRecargando(true)
        try {
            await ReqRequestApiAventas.get<HistorialInterface[]>('Gira/GastoViajeDetalle/' + GiraState.UsuarioID + '/4/1/10')
                .then(x => {
                    setNosync(x.data)
                    setPage(2)
                    x.data.length < 10 ? setRecargar(false) : setRecargar(true)
                })
        } catch (err) {
            console.log('no cargo')
        }
        setRecargando(false)
    }
    const getNoSyncMas = async () => {
        if (recargar) {
            try {
                await ReqRequestApiAventas.get<HistorialInterface[]>('Gira/GastoViajeDetalle/' + GiraState.UsuarioID + '/4/' + Page + '/10')
                    .then(x => {
                        setNosync(noSync.concat(x.data))
                        setPage(Page + 1)
                        x.data.length < 10 ? setRecargar(false) : setRecargar(true)
                    })
            } catch (err) {
                console.log('no cargo')
            }
        }
    }
    const sincronizarAX = async (id: number) => {
        await ReqRequestApiAventas.get<{ Content: string }>('Gira/DatosEnviarAX/' + id).then(async (x) => {
            if (x.data.Content === '"Ok"') {
                await ReqRequestApiAventas.post<number>('Gira/ActualizarEstadoGasto/' + id + '/2/-/-/-').then(resp => {
                    if (resp.data == 1) {
                        cantidadNoSync
                        getNoSync()
                    }
                })
            } else {
                if (x.data.Content.length > 50) {
                    alertas('Error al sincronizar', true, false)
                } else {
                    alertas(x.data.Content, true, false)
                }
            }
        })
        setIdSync(0)
    }

    const cantidadNoSync = async() =>{
        await ReqRequestApiAventas.get<number>('Gira/GastoViajeDetalle/'+GiraState.UsuarioID+'/4')
        .then(x=>{
            changeCatNoSync(x.data)
        })
    }

    const alertas = (mensaje: string, show: boolean, tipo: boolean) => {
        setMensajeAlerta(mensaje)
        setShowMensajeAlerta(show)
        setTipoMensaje(tipo)
    }

    const renderItem = (item: HistorialInterface) => {
        const cambioFecha = (fecha: string) => {
            return fecha.substring(0, 10);
        };

        return (
            <View style={{ borderWidth: 1, width: "98%", flexDirection: 'row', paddingHorizontal: 3, borderRadius: 5, borderColor: '#628E90', backgroundColor: '#f0f0f0', marginHorizontal: '1%', marginVertical: 2 }}>
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        idSync != item.IdGastoViajeDetalle ?
                            <TouchableOpacity onPress={() => { sincronizarAX(item.IdGastoViajeDetalle); setIdSync(item.IdGastoViajeDetalle) }}>
                                <FontAwesome5Icon
                                    name='sync-alt'
                                    style={{ color: '#000' }}
                                    size={IconHeader}
                                    solid />
                            </TouchableOpacity>
                            :
                            < ActivityIndicator size='large' color={'#000'} />
                    }
                </View>
                <View style={{ width: '80%' }}>
                    <Text style={[styles.text, { textAlign: 'left' }]}>
                        <Text style={styles.text}>Categoria:</Text> {item.categoria}
                    </Text>
                    <Text style={[styles.text, { textAlign: 'left' }]}>
                        <Text style={styles.text}>Valor: </Text>{GiraState.MonedaAbreviacion}{item.ValorFactura.toFixed(2)}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.text2}>Fecha Creacion:</Text> {item.FechaCreacion.toString().replace('T', ' ').substring(0, 16).replace('-', '/').replace('-', '/')}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.text2}>Fecha Factura:</Text> {cambioFecha(item.FechaFactura.toString())}
                    </Text>
                </View>
                <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />
            </View>
        );
    }

    useEffect(() => {
        getNoSync()
    }, [])

    return (
        <View style={styles.container}>
            <HeaderLogout GoBack={false} navigation={navigation} />
            {
                noSync.length > 0 || showMensajeAlerta ?
                    <FlatList
                        data={noSync}
                        keyExtractor={(item) => item.IdGastoViajeDetalle.toString()}
                        renderItem={({ item }) => renderItem(item)}
                        refreshControl={
                            <RefreshControl refreshing={false} onRefresh={getNoSync} colors={['#069A8E']} />
                        }
                        showsVerticalScrollIndicator={false}
                        onEndReached={getNoSyncMas}
                    />
                    :
                    <View style={{ flex: 1, width: '100%', justifyContent: "center" }}>
                        <Text style={[styles.text, { textAlign: 'center' }]}>No se han encontrado gastos no sincronizados...</Text>
                        <View style={{ alignItems: "center" }}>
                            <Text></Text>
                            {
                                !recargando ?
                                    <TouchableOpacity onPress={getNoSync} style={{ alignItems: "center", width: IconHeader, }}>
                                        <FontAwesome5Icon
                                            name='sync'
                                            style={{ color: '#dde' }}
                                            size={IconHeader}
                                            solid />
                                    </TouchableOpacity>
                                    :
                                    < ActivityIndicator size='large' color={'#dde'} />
                            }
                        </View>
                    </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    loader: {
        width: '100%',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: "left",
        fontStyle: "italic",
        //fontFamily: 'sans-serif'
    },
    text2: {
        fontSize: 16,
        textAlign: "right",
        fontWeight: "bold",
        fontStyle: "normal",
        //fontFamily: 'sans-serif'
    },
})

export default NoSyncScreen;