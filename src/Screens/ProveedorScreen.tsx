import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { RootStackParams } from "../Navigation/Navigation";
import HeaderLogout from "../Components/HeaderLogout";
import { useContext, useState } from "react";
import TextInputContainer from "../Components/TextInputContainer";
import { GiraContext } from "../Context/GiraContext";
import { ObjectHeigth } from "../Constants/Texto";

const ProveedorScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const [nombre, setNombre] = useState<string>('');
    const [documentoFiscal, setDocumentoFiscal] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [imagen, setImagen] = useState<string>('');
    const { GiraState } = useContext(GiraContext)
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