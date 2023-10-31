import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "react-native"
import { RootStackParams } from "../Navigation/Navigation";
import HeaderLogout from "../Components/HeaderLogout";

const NoSyncScreen = () =>{
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    return(
        <View>
            <HeaderLogout GoBack={false} navigation={navigation}/>

            <Text>No Sync</Text>
        </View>
    )
}

export default NoSyncScreen;