import { Pressable, StyleSheet, Text, View } from "react-native"
import { TextoHeader } from "../Constants/Texto";
import { HeaderInterface } from "../Interfaces/HeaderInterface";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { IconHeader } from "../Constants/BottomTab";
import { useContext } from "react";
import { GiraContext } from "../Context/GiraContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HeaderLogout = ({GoBack,navigation}:HeaderInterface) =>{
    const {GiraState,changeLogeado} = useContext(GiraContext)
    const handlePressLogout = async () => {
        await AsyncStorage.removeItem('usuarioID')

        changeLogeado(false)
    }
    return (
        <View style={styles.header}>
            {
                GoBack &&
                <Pressable onPress={navigation.goBack}>
                    <FontAwesome5Icon name="chevron-left" size={IconHeader} color={'#fff'} />
                </Pressable>
            }
            <Text style={styles.text}>Bienvenido(a): {GiraState.Nombre}</Text>
            {
                !GoBack &&
                <Pressable onPress={handlePressLogout}>
                    <FontAwesome5Icon name='sign-out-alt' size={IconHeader} color={'#fff'}/>
                </Pressable>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        //height: '20%',
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: '#069A8E',
        padding: 5,
    },
    text: {
        flex: 3,
        fontSize: TextoHeader,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: "center",

    },
})

export default HeaderLogout;