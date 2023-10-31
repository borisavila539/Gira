import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "react-native"
import { RootStackParams } from "../Navigation/Navigation";
import HeaderLogout from "../Components/HeaderLogout";

const ProveedorScreen = () =>{
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    return(
        <View>
            <HeaderLogout GoBack={false} navigation={navigation}/>

            <Text>Proveedor</Text>
        </View>
    )
}

export default ProveedorScreen;