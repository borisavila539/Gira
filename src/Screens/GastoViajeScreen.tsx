import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import HeaderLogout from "../Components/HeaderLogout";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../Navigation/Navigation";
import { ObjectHeigth, TextoPantallas } from "../Constants/Texto";
import DropDownList from "../Components/DropDownList";
import { useContext, useEffect, useState } from "react";
import { ReqRequestApiAventas, ReqRequestApiProxy } from "../Api/API";
import { GiraContext } from "../Context/GiraContext";
import { CategoriaGasto, TipoGasto } from "../Interfaces/GastoViajeInterfaces";
import RadioButtonRN from 'radio-buttons-react-native'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../Styles/StylesGastoViaje";
import { IconSelect } from "../Constants/BottomTab";
import { ProveedoresInterface } from "../Interfaces/Proveedores";
import MyAlert from "../Components/MyAlert";
import { APIURLPROXY } from "../Constants/Api";
import axios from "axios";
import { CombustibleInterface } from "../Interfaces/CombustiblesInterface";
import TextInputContainer from "../Components/TextInputContainer";
import { ImpuestosInterface } from "../Interfaces/ImpuestosInterface";
import { parse } from "react-native-svg";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const GastoViajeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const { GiraState } = useContext(GiraContext);
    const [TipoGasto, setTipoGasto] = useState<TipoGasto[]>([]);
    const [TipogastoArray, setTipoGastoArray] = useState<string[]>([])
    const [categoriaGasto, setCategoriaGasto] = useState<CategoriaGasto[]>([])
    const [categoriaGastoArray, setCategoriaGastoArray] = useState<string[]>([])
    const [idCategoria, setIdCategoria] = useState<number>(0)
    const [categoriaNombre, setCategoriaNombre] = useState<string>('')
    const [disabledCategoria, setDisabledCategoria] = useState<boolean>(true)
    const [proveedor, setProveedor] = useState<string>('')
    const [proveedores, setProveedores] = useState<ProveedoresInterface[]>([])
    const [proveedoresArray, setProveedoresArray] = useState<string[]>([])
    const [selectAlimentacion, setSelectAlimentacion] = useState<boolean>(false)
    const dataAlimentos = [{ label: 'Desayuno' }, { label: 'Almuerzo' }, { label: 'Cena' }]
    const [TipoAlimento, setTipoAlimento] = useState<string>('')
    const [documentoFiscal, setDocumentoFiscal] = useState<string>('')
    const [BuscandoProveedor, setBuscandoproveedor] = useState<boolean>(false)
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [combustibles, setCombustibles] = useState<CombustibleInterface[]>([])
    const [combustibleID, setCombustibleID] = useState<number>(0)
    const [combustiblesArray, setCombustiblesArray] = useState<string[]>([])
    const [serie, setSerie] = useState<string>('')
    const [factura, setFactura] = useState<string>('')
    const [Descripcion, setDescripcion] = useState<string>('')
    const [Gravado, setGravado] = useState<string>('')
    const [Exento, setExento] = useState<string>('')
    const [total, setTotal] = useState<string>('')
    const [impuesto, setimpuesto] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [openDate, setOpenDate] = useState<boolean>(false)
    const [showDate, setShowDate] = useState<Date>(new Date())

    const onScreeenLoad = async () => {
        try {
            await ReqRequestApiAventas.get<TipoGasto[]>('Gira/TipoGasto/' + GiraState.Empresa)
                .then(x => {
                    setTipoGasto(x.data)
                    let array: string[] = []
                    x.data.forEach(element => array.push(element.Nombre))
                    setTipoGastoArray(array)
                })
        } catch (err) {
            console.log(err)
        }

        try {
            await ReqRequestApiAventas.get<CategoriaGasto[]>('Gira/CategoriaGasto/' + GiraState.Empresa)
                .then(x => {
                    setCategoriaGasto(x.data)
                })
        } catch (err) {
            console.log(err)
        }

        try {
            if (GiraState.Empresa === 'IMGT') {
                await ReqRequestApiAventas.get<CombustibleInterface[]>('Gira/combustibles')
                    .then(x => {
                        setCombustibles(x.data)
                        let array: string[] = []
                        x.data.forEach(x => {
                            array.push(x.Nombre)
                        })
                        setCombustiblesArray(array)
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onSelectTipo = (selectedItem: string, index: number) => {
        let id: any;
        id = (TipoGasto?.find(x => x.Nombre == selectedItem))?.Id;
        let array: string[] = []
        categoriaGasto?.forEach(element => {
            if (element.IdTipoGastoViaje == id && element.activo == true) {
                array.push(element.CategoriaNombre)
                setDisabledCategoria(false)
            }
        })
        setCategoriaGastoArray(array)
    }

    const onSelectCategoria = (selectedItem: string, index: number) => {
        let id: any;
        let proveedorTMP: any;
        let nombreCategoria: any;

        id = (categoriaGasto?.find(x => x.CategoriaNombre == selectedItem))?.idCategoriaTipoGastoViaje;
        proveedorTMP = (categoriaGasto?.find(x => x.CategoriaNombre == selectedItem))?.ProveedorPredefinido
        nombreCategoria = (categoriaGasto?.find(x => x.CategoriaNombre == selectedItem))?.CategoriaNombre
        setIdCategoria(id);
        setProveedor(proveedorTMP.length > 0 ? proveedorTMP : '')
        setSelectAlimentacion(selectedItem === 'Alimentacion' ? true : false)
        setCategoriaNombre(nombreCategoria)
        setDocumentoFiscal('')
        setFactura('')
        setProveedores([])
        setCombustibleID(0)
    }

    const BuscarProveedor = async () => {
        setBuscandoproveedor(true)

        try {

            await ReqRequestApiProxy.get<ProveedoresInterface[]>('api/proveedores/' + documentoFiscal + '/' + GiraState.Empresa)
                .then(x => {
                    if (x.data.length === 0) {
                        setProveedores([])
                        setMensajeAlerta('No se encontraron Proveedores')
                        setTipoMensaje(false)
                    } else {
                        setProveedores(x.data)
                        let array: string[] = []
                        x.data.forEach(element => {
                            array.push(element.Identificacion + ' ' + element.Nombre)
                        })
                        setProveedoresArray(array)
                        setMensajeAlerta('Lista Proveedores llena')
                        setTipoMensaje(true)
                    }
                })
            setShowMensajeAlerta(true)
        } catch (err) {
            console.log(err)
        }
        setBuscandoproveedor(false)
    }

    const onSelectProveedor = (selectedItem: string, index: number) => {
        let proveedorTMp: any;
        proveedorTMp = (proveedores?.find(x => (x.Identificacion + ' ' + x.Nombre) === selectedItem))?.CodigoProveedor;
        setProveedor(proveedorTMp)
    }

    const onSelectCombustible = (selectedItem: string, index: number) => {
        let combustibleTMP: any;
        combustibleTMP = (combustibles?.find(x => x.Nombre === selectedItem))?.Id;
        setCombustibleID(combustibleID)
    }

    const onChangeFactura = (value: string) => {
        if (GiraState.Empresa === 'IMHN') {
            if (value.length == 16) {
                value = value[0] + value[1] + value[2] + '-' + value[3] + value[4] + value[5] + '-' + value[6] + value[7] + '-' + value[8] + value[9] + value[10] + value[11] + value[12] + value[13] + value[14] + value[15]
            } else if (value.length == 18) {
                value = value.replace('-', '').replace('-', '').replace('-', '')
            }
            setFactura(value)
        } else {
            setFactura(value)
        }
    }

    const getImpuesto = async () => {
        if (GiraState.Empresa === 'IMHN') {
            try {
                await ReqRequestApiAventas.get<ImpuestosInterface>('Gira/GrupoImpuesto/' + GiraState.Empresa)
                    .then(x => {
                        setimpuesto(x.data.Content)
                    })
            } catch (err) {

            }
        }
    }

    const calcTotal = () => {
        if (GiraState.Empresa == 'IMHN') {
            let calcTotal: number = parseFloat(Gravado.length > 0 ? Gravado : '0') * (1 + parseFloat(impuesto.length > 0 ? impuesto : '0')) + parseFloat(Exento.length > 0 ? Exento : '0');
            setTotal(calcTotal.toFixed(2).toString())
        }
    }

    const onChanceDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setOpenDate(false)
        let fecha: any = selectedDate
        if (event.type == 'set') {
            if (fecha <= new Date()) {
                let selected: string = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear()
                setDate(selected)
                setShowDate(fecha)
            }else{
                setMensajeAlerta('Debe seleccionar una fecha correcta')
                setShowMensajeAlerta(true)
                setTipoMensaje(false)
            }

        }
    }

    useEffect(() => {
        calcTotal()
    }, [Exento, Gravado])

    useEffect(() => {
        onScreeenLoad()
        getImpuesto()
    }, [])

    return (
        <View>
            <HeaderLogout GoBack={false} navigation={navigation} />
            <ScrollView style={{ height: '92%' }} showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <DropDownList
                            data={TipogastoArray}
                            defaultButtonText="Seleccione Tipo"
                            onSelect={onSelectTipo} />
                        <DropDownList
                            data={categoriaGastoArray}
                            defaultButtonText="Seleccione Gasto"
                            onSelect={onSelectCategoria}
                            disabled={disabledCategoria} />
                        {
                            selectAlimentacion &&
                            <RadioButtonRN
                                data={dataAlimentos}
                                style={{ flex: 1, width: '95%' }}
                                boxStyle={{ flex: 1, alignItems: 'center', marginHorizontal: 0, paddingHorizontal: 10 }}
                                textStyle={{ color: '#000', fontSize: 16 }}
                                initial={1}
                                selectedBtn={(value: string) => setTipoAlimento(value)}
                                box={false}
                                textColor={'#000'}
                                icon={<FontAwesome5Icon name="check" size={15} color={'#005555'} />}
                                circleSize={10}
                            />
                        }
                        <View style={styles.textInputDateContainer}>
                            <Text style={styles.text}>{GiraState.DocumentoFiscal}</Text>
                            <View style={styles.inputIconContainer}>
                                <TextInput style={styles.input} keyboardType="default" value={documentoFiscal} onChangeText={(value: string) => setDocumentoFiscal(value)} />
                                {
                                    !BuscandoProveedor ?
                                        <TouchableOpacity onPress={documentoFiscal != '' ? BuscarProveedor : () => null}>
                                            <FontAwesome5Icon name="search" size={IconSelect} color={'#1A4D2E'} />
                                        </TouchableOpacity>
                                        :
                                        <ActivityIndicator size={'small'} color={'#000'} />
                                }

                            </View>
                        </View>
                        <DropDownList
                            defaultButtonText="Seleccione Proveedor"
                            data={proveedoresArray}
                            search={true}
                            onSelect={onSelectProveedor}
                            disabled={proveedores.length == 0} />
                        {
                            combustibles.length > 0 && categoriaNombre === 'Combustible' &&
                            <DropDownList
                                defaultButtonText="Seleccione COmbustible"
                                data={combustiblesArray}
                                onSelect={onSelectCombustible} />
                        }
                        {
                            GiraState.Empresa === 'IMGT' &&
                            <TextInputContainer
                                title="No. Serie"
                                height={ObjectHeigth}
                                tecladoNUm={false}
                                editable={proveedor != ''}
                                onchangeText={(value: string) => setSerie(value)}
                                value={serie} />
                        }
                        <TextInputContainer
                            title="No. Factura"
                            height={ObjectHeigth}
                            placeholder={GiraState.Empresa == 'IMHN' ? 'XXX-XXX-XX-XXXXXXXX' : ''}
                            tecladoNUm={GiraState.Empresa == 'IMHN' ? true : false}
                            editable={proveedor != ''}
                            onchangeText={onChangeFactura}
                            value={factura}
                            maxlength={GiraState.Empresa == 'IMHN' ? 19 : 30}
                        />
                        <TextInputContainer
                            title="Descripcion"
                            justify={true}
                            height={80}
                            tecladoNUm={false}
                            multiline={true}
                            maxlength={200}
                            editable={true}
                            onchangeText={(value: string) => setDescripcion(value)}
                            value={Descripcion}
                        />
                        {
                            GiraState.Empresa === 'IMHN' &&
                            <>
                                <TextInputContainer
                                    title="Importe Gravado"
                                    height={ObjectHeigth}
                                    placeholder="0.00"
                                    tecladoNUm={true}
                                    onchangeText={(value: string) => setGravado(value)}
                                    value={Gravado}
                                    editable={true}
                                />
                                <TextInputContainer
                                    title="Importe Exento"
                                    height={ObjectHeigth}
                                    placeholder="0.00"
                                    tecladoNUm={true}
                                    onchangeText={(value: string) => setExento(value)}
                                    value={Exento}
                                    editable={true}
                                />
                                <TextInputContainer
                                    title="Total"
                                    height={ObjectHeigth}
                                    placeholder="0.00"
                                    tecladoNUm={true}
                                    value={total}
                                    editable={false}
                                />

                            </>
                        }
                        {
                            GiraState.Empresa === 'IMGT' && categoriaNombre === 'Hospedaje' &&
                            <TextInputContainer
                                title="Importe Exento"
                                height={ObjectHeigth}
                                placeholder="0.00"
                                tecladoNUm={true}
                                onchangeText={(value: string) => setExento(value)}
                                value={Exento}
                                editable={true}
                            />
                        }
                        {
                            GiraState.Empresa === 'IMGT' && categoriaNombre === 'Combustible' &&
                            <TextInputContainer
                                title="Cantidad Galones"
                                height={ObjectHeigth}
                                placeholder="0.00"
                                tecladoNUm={true}
                                onchangeText={(value: string) => setExento(value)}
                                value={Exento}
                                editable={true}
                            />
                        }
                        {
                            GiraState.Empresa === 'IMGT' &&
                            <TextInputContainer
                                title="Total"
                                height={ObjectHeigth}
                                placeholder="0.00"
                                tecladoNUm={true}
                                onchangeText={setTotal}
                                value={total}
                                editable={true}
                            />
                        }
                        <TouchableOpacity onPress={() => setOpenDate(true)}>
                            <View style={styles.textInputDateContainer}>
                                <Text style={styles.text}>Fecha Factura</Text>
                                <View style={styles.inputIconContainer}>
                                    <TextInput style={styles.input} placeholder="01/01/2000" editable={false} value={date} />
                                    <FontAwesome5Icon name="calendar-alt" size={IconSelect} color={'#1A4D2E'} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {
                            openDate &&
                            <RNDateTimePicker
                                testID="dateTimePicker"
                                display="default"
                                mode="date"
                                value={showDate }
                                onChange={onChanceDate}
                                style={{ width: '100%' }}
                            />
                        }
                    </View>
                </SafeAreaView>
            </ScrollView>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />
        </View>
    )
}


export default GastoViajeScreen;