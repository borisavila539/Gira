import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../Screens/LoginScreen";
import BottomTabNavigation from "../Screens/BottomTabNav";
import { useContext, useState } from "react";
import { GiraContext } from "../Context/GiraContext";
import { Animated } from "react-native";



export type RootStackParams = {
    LoginScreen: undefined,
    TabNavigation: undefined
}
const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
    const [logeado, setLogeado] = useState<boolean>(false)
    const { GiraState } = useContext(GiraContext)
    const av = new Animated.Value(0);
    av.addListener(() => { return });

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                !GiraState.logeado ?
                    <Stack.Screen name='LoginScreen' options={{ title: 'LoginScreen' }} component={LoginScreen} />
                    :
                    <Stack.Screen name="TabNavigation" options={{ title: 'TabNavigation' }} component={BottomTabNavigation} />
            }

        </Stack.Navigator>
    )
}