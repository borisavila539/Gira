import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParams } from "../Navigation/Navigation";
import HeaderLogout from "../Components/HeaderLogout";
import { styles } from "../Styles/StyleHistory";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DropDownList from "../Components/DropDownList";
import { useContext, useEffect, useState } from "react";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import MyAlert from "../Components/MyAlert";
import { ReqRequestApiAventas } from "../Api/API";
import { EstadoInterface } from "../Interfaces/EstadoInterface";
import { GiraContext } from "../Context/GiraContext";
import { APIURLAVENTAS } from "../Constants/Api";
import { HistorialInterface } from "../Interfaces/HistorialInterface";
import { IconHeader } from "../Constants/BottomTab";

const HistorialScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const [openDateIni, setOpenDateIni] = useState<boolean>(false);
    const [openDateFin, setOpenDateFin] = useState<boolean>(false);
    const [dateIni, setDateIni] = useState<string>('');
    const [dateFin, setDateFin] = useState<string>('');
    const [showdateIni, setShowDateIni] = useState<Date>(new Date());
    const [showdateFin, setShowDateFin] = useState<Date>(new Date());
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [Estados, setEstados] = useState<EstadoInterface[]>([])
    const [EstadosArray, setEstadosArray] = useState<string[]>([])
    const [estadoID, setEstadoID] = useState<number>(0)
    const [cargando, setCargando] = useState<boolean>(false)
    const { GiraState } = useContext(GiraContext)
    const [Historial, setHistorial] = useState<HistorialInterface[]>([])
    const [Page, setPage] = useState<number>(1)
    const [recargar, setRecargar] = useState<boolean>(false)

    const initDate = (fin: Date, ini: Date) => {
        ini.setMonth(ini.getMonth() - 1)
        const inicio = ini.getFullYear() + '-' + (ini.getMonth() + 1) + '-' + ini.getDate();
        const final = fin.getFullYear() + '-' + (fin.getMonth() + 1) + '-' + fin.getDate();
        setDateIni(inicio)
        setDateFin(final)
    }
    const onchangeIni = (event: DateTimePickerEvent, selectedDate?: any) => {
        let selected: string = selectedDate!.getFullYear() + '-' + (selectedDate!.getMonth() + 1) + '-' + selectedDate!.getDate()
        setOpenDateIni(false)
        if (event.type = "set") {
            if (selectedDate! <= showdateFin) {
                setDateIni(selected)
                setShowDateIni(selectedDate!)
            } else {
                alertas('La fecha inicial debe ser menor o igual que la fecha final', true, false)
            }
        }
    }

    const onchangeFIn = (event: DateTimePickerEvent, selectedDate?: Date) => {
        let selected: string = selectedDate!.getFullYear() + '-' + (selectedDate!.getMonth() + 1) + '-' + selectedDate!.getDate()
        setOpenDateFin(false)
        console.log(selectedDate)
        if (event.type = "set") {
            if (selectedDate! >= showdateIni) {
                setDateFin(selected)
                setShowDateFin(selectedDate!)
            } else {
                alertas('La fecha final debe ser mayor o igual que la fecha inical', true, false)
            }
        }
    }

    const alertas = (mensaje: string, show: boolean, tipo: boolean) => {
        setMensajeAlerta(mensaje)
        setShowMensajeAlerta(show)
        setTipoMensaje(tipo)
    }

    const getEstados = async () => {
        try {
            await ReqRequestApiAventas.get<EstadoInterface[]>('Gira/Estado')
                .then(resp => {
                    let array: string[] = []
                    array.push('Todos')
                    resp.data.forEach(element => {
                        array.push(element.Nombre)
                    })
                    setEstados(resp.data)
                    setEstadosArray(array)
                })
        } catch (err) {

        }
    }

    const onSelectEstado = (selectedItem: string, index: number) => {
        if (index == 0) {
            setEstadoID(index)
        } else {
            let id: any
            id = Estados.find(x => x.Nombre == selectedItem)?.IdEstado
            setPage(1)
            setEstadoID(id)
            console.log(index)
        }
    }

    const gethistorial = async () => {
        setCargando(true)
        try {
            await ReqRequestApiAventas.get<HistorialInterface[]>('Gira/GastoViajeDetalle/' + GiraState.UsuarioID + '/' + dateIni + '/' + dateFin + '/1/10/' + estadoID)
                .then(x => {
                    setHistorial(x.data)
                    setPage(2)
                    x.data.length < 10 ? setRecargar(false) : setRecargar(true)
                })
        } catch (err) {
            console.log('no cargo')
        }
        setCargando(false)
    }

    const getHistorialMas = async () => {
        if (recargar) {
            setCargando(true)
            try {
                await ReqRequestApiAventas.get<HistorialInterface[]>('Gira/GastoViajeDetalle/' + GiraState.UsuarioID + '/' + dateIni + '/' + dateFin + '/' + Page + '/10/' + estadoID)
                    .then(x => {
                        setHistorial(Historial.concat(x.data))
                        setPage(Page + 1)
                        x.data.length < 10 ? setRecargar(false) : setRecargar(true)
                    })
            } catch (err) {
                console.log('no cargo')
            }
            setCargando(false)
        }

    }

    const renderItem = (item: HistorialInterface) => {

        const cambioFecha = (fecha: string) => {
            return fecha.substring(0, 10).replace('-', '/').replace('-', '/');
        };

        const EstadoColor = (estado: string) => {
            let colorEstado = '#000';
            switch (estado) {
                case 'Pendiente':
                    colorEstado = '#000';
                    break;
                case 'Aprobado':
                    colorEstado = '#0078AA';
                    break;
                case 'Rechazado':
                    colorEstado = '#F32424';
                    break;
                case 'PendienteAX':
                    colorEstado = '#FF9F29'
                    break;
                default:
                    colorEstado = '#000';
            }
            return colorEstado;
        }
        return (
            <View style={{ borderWidth: 1.5, width: "98%", flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, borderColor: EstadoColor(item.Estado), backgroundColor: '#fff', marginHorizontal: '1%', marginVertical: 2 }}>
                <TouchableOpacity style={{ width: '100%', flexDirection: 'row' }} onPress={() => console.log('His')}>
                    <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon
                            name='file-invoice-dollar'
                            style={{ color: EstadoColor(item.Estado) }}
                            size={IconHeader}
                            solid />
                        <Text style={[styles.text, { textAlign: 'left', color: EstadoColor(item.Estado) }]}>{item.Estado}</Text>
                    </View>
                    <View style={{ width: '80%' }}>
                        <Text style={[styles.text, { textAlign: 'left', color: EstadoColor(item.Estado) }]}>
                            <Text style={styles.text2}>Categoria:</Text> {item.categoria}
                        </Text>
                        <Text style={[styles.text, { textAlign: 'left', color: EstadoColor(item.Estado) }]}>
                            <Text style={styles.text2}>Valor: </Text>{GiraState.MonedaAbreviacion}{item.ValorFactura.toFixed(2)}
                        </Text>
                        <Text style={[styles.text, { color: EstadoColor(item.Estado) }]}>
                            <Text style={styles.text2}>Fecha Creacion:</Text> {item.FechaCreacion.toString().replace('T', ' ').substring(0, 16).replace('-', '/').replace('-', '/')}
                        </Text>
                        <Text style={[styles.text, { color: EstadoColor(item.Estado) }]}>
                            <Text style={styles.text2}>Fecha Factura:</Text> {cambioFecha(item.FechaFactura.toString())}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        initDate(showdateFin, showdateIni)
        getEstados()
    }, [])

    useEffect(() => {
        if (dateIni && dateFin)
            gethistorial()
    }, [dateIni, dateFin, estadoID])
    return (
        <View>
            <HeaderLogout GoBack={false} navigation={navigation} />

            <View style={styles.filtersContainer}>
                <ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 5 }} showsHorizontalScrollIndicator={false}>
                    <View style={styles.containerSafeAreView}>
                        <View style={styles.filters}>
                            <View style={styles.textInputDateContainer}>
                                <Text style={styles.text}>Inicio:</Text>
                                <TouchableOpacity onPress={() => setOpenDateIni(true)}>
                                    <View style={styles.inputIconContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={'01/01/2000'}
                                            editable={false}
                                            value={dateIni}
                                        />
                                        <FontAwesome5Icon name="calendar-alt" size={20} color={'#1A4D2E'} />
                                    </View>
                                </TouchableOpacity>
                                {
                                    openDateIni && (<RNDateTimePicker
                                        testID="dateTimePicker"
                                        display="calendar"
                                        mode="date"
                                        value={showdateIni}
                                        onChange={onchangeIni}
                                        style={{ width: '100%' }}

                                    />)
                                }
                            </View>

                            <View style={styles.textInputDateContainer}>
                                <Text style={styles.text}>Fin:</Text>
                                <TouchableOpacity onPress={() => setOpenDateFin(true)}>
                                    <View style={styles.inputIconContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={'01/01/2000'}
                                            editable={false}
                                            value={dateFin}
                                        />
                                        <FontAwesome5Icon name="calendar-alt" size={20} color={'#1A4D2E'} />
                                    </View>
                                </TouchableOpacity>
                                {
                                    openDateFin && (<RNDateTimePicker
                                        testID="dateTimePicker"
                                        display="calendar"
                                        mode="date"
                                        value={showdateFin}
                                        onChange={onchangeFIn}
                                        style={{ width: '100%' }}
                                    />)
                                }
                            </View>

                            <View style={{ width: 180, justifyContent: "flex-end" }}>
                                <DropDownList defaultButtonText='-- Estado --' data={EstadosArray} onSelect={onSelectEstado} />

                            </View>
                        </View>


                    </View>
                </ScrollView>
            </View>
            {
                Historial.length > 0 &&
                <FlatList
                    data={Historial}
                    keyExtractor={(item: HistorialInterface) => item.IdGastoViajeDetalle.toString()}
                    renderItem={({ item }) => renderItem(item)}
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={() => gethistorial()} colors={['#069A8E']} />
                    }
                    onEndReached={() => getHistorialMas()}
                    style={{ backgroundColor: '#fff' }}
                />
            }
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />
        </View>
    )
}

export default HistorialScreen;