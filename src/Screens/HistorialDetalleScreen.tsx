import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../Navigation/Navigation"
import { FC, useContext, useEffect, useState } from "react"
import { Image, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"
import HeaderLogout from "../Components/HeaderLogout"
import { ReqRequestApiAventas } from "../Api/API"
import { HistorialDetalleInterface } from "../Interfaces/HistorialDetalle"
import { styles } from "../Styles/StyleHistorialDetalle"
import Buttons from "../Components/Buttons"
import { GiraContext } from "../Context/GiraContext"
import Base64Downloader, { triggerBase64Download } from "../../node_modules/react-base64-downloader";



type props = StackScreenProps<RootStackParams, 'HistorialDetalleScreen'>

const HistorialDetalleScreen: FC<props> = ({ navigation, route }) => {
    const [gasto, setGasto] = useState<HistorialDetalleInterface>()
    const [ModalVisible, setModalVisible] = useState<boolean>(false)
    const [descargar, setDescargar] = useState(false)
    const { GiraState } = useContext(GiraContext)

    const getGasto = async () => {
        await ReqRequestApiAventas.get<HistorialDetalleInterface[]>('Gira/GastoViajeDetalle/' + route.params.id)
            .then(x => {
                x.data.forEach(element => {
                    setGasto(element)
                })
            })
    }
    const descargarImagen = async () => {
        setDescargar(true)
        try{
            //triggerBase64Download(('data:image/jpeg;base64,' + gasto!.imagen),'Gasto')
        }catch(err){
            console.log(err)
        }
        
        setDescargar(false)

    }

    useEffect(() => {
        getGasto()
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <HeaderLogout GoBack={true} navigation={navigation} />
            {
                gasto?.ValorFactura != 0 ?
                    <ScrollView>
                        <SafeAreaView style={styles.body}>
                            <Modal animationType="fade" transparent={true} visible={ModalVisible} onRequestClose={() => setModalVisible(false)}>
                                <View style={styles.modal}>
                                    <Base64Downloader base64={'data:image/jpeg;base64,' + gasto!.imagen}>Down</Base64Downloader>
                                    <Pressable style={styles.hideimage} onPress={() => setModalVisible(false)}>
                                        <Image source={{ uri: 'data:image/jpeg;base64,' + gasto?.imagen }} style={styles.imageModal} />
                                        <View style={{ width: '80%', maxWidth: 300 }}>
                                            <Buttons disabled={descargar} title={descargar ? 'Descargando...' : "Descargar"} onPressFunction={descargarImagen} />
                                        </View>
                                    </Pressable>
                                </View>
                            </Modal>
                            <View style={styles.containerDetalle}>
                                <View style={styles.containerDetalle2}>
                                    {
                                        gasto?.imagen == '' ?
                                            <View>
                                                <Image source={require('../Assets/No-Image.png')} style={styles.image} />
                                            </View>
                                            :
                                            <View>
                                                <Pressable onPress={() => setModalVisible(true)}>
                                                    <Image source={{ uri: 'data:image/jpeg;base64,' + gasto?.imagen }} style={styles.image} />
                                                </Pressable>
                                            </View>

                                    }
                                    <View style={styles.containerInfo}>
                                        <Text style={styles.text}>Tipo de Gasto:</Text>
                                        <Text style={styles.text2}> {gasto?.Tipo}</Text><Text></Text>
                                        <Text style={styles.text}>Categoria de Gasto:</Text>
                                        <Text style={styles.text2}> {gasto?.categoria}</Text><Text></Text>
                                        <Text style={styles.text}>Fecha Envio: </Text>
                                        <Text style={styles.text2}>{gasto?.FechaCreacion}</Text><Text></Text>
                                        <Text style={styles.text}>Fecha Factura: </Text>
                                        <Text style={styles.text2}>{gasto?.FechaFactura}</Text><Text></Text>
                                        {
                                            gasto?.serie != '' &&
                                            <>
                                                <Text style={styles.text}>No. Serie: </Text>
                                                <Text style={styles.text2}>{gasto?.serie}</Text><Text></Text>
                                            </>
                                        }
                                        {
                                            gasto?.NoFactura != '' &&
                                            <>
                                                <Text style={styles.text}>No. Factura: </Text>
                                                <Text style={styles.text2}>{gasto?.NoFactura}</Text><Text></Text>
                                            </>
                                        }
                                        {
                                            gasto?.Descripcion != '' &&
                                            <>
                                                <Text style={styles.text}>Descripcion: </Text>
                                                <Text style={styles.text2}>{gasto?.Descripcion}</Text>
                                            </>

                                        }
                                        {
                                            gasto?.importeGravado != 0 &&
                                            <>
                                                <Text></Text>
                                                <Text style={styles.text}>Importe Gravado: </Text>
                                                <Text style={styles.text2}>{GiraState.MonedaAbreviacion}{gasto?.importeGravado.toFixed(2)}</Text>
                                            </>
                                        }
                                        {
                                            gasto?.importeExento != 0 &&
                                            <>
                                                <Text></Text>
                                                <Text style={styles.text}>Importe Exento: </Text>
                                                <Text style={styles.text2}>{GiraState.MonedaAbreviacion}{gasto?.importeExento.toFixed(2)}</Text>
                                            </>
                                        }
                                        <Text></Text>
                                        <Text style={styles.text}>Total Factura: </Text>
                                        <Text style={styles.text2}>{GiraState.MonedaAbreviacion}{gasto?.ValorFactura.toFixed(2)}</Text>
                                        {
                                            gasto?.Admin != null &&
                                            <>
                                                <Text></Text>
                                                <Text style={styles.text}>Administrador: </Text>
                                                <Text style={styles.text2}>{gasto?.Admin}</Text>
                                            </>

                                        }
                                        {
                                            gasto?.DescripcionAdmin != '' &&
                                            <>

                                                <Text></Text>
                                                <Text style={styles.text}>Descripcion Rechazo: </Text>
                                                <Text style={styles.text2}>{gasto?.Descripcion}</Text>
                                            </>
                                        }
                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                    :
                    <View style={styles.containerDetalle}>
                        <Text style={[styles.text, { color: '#ddd' }]}>Cargando...</Text>
                    </View>
            }
        </View>
    )
}

export default HistorialDetalleScreen;