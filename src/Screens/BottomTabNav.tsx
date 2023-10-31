import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GastoViajeScreen from "./GastoViajeScreen";
import HistorialScreen from "./HistorialScreen";
import { IconosBottomTab, LabelBottomTab } from "../Constants/BottomTab";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ProveedorScreen from "./ProveedorScreen";
import NoSyncScreen from "./NoSyncScreen";
import { StatusBar } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <>
        <StatusBar backgroundColor={'#069A8E'} translucent/>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName: string = '';
                    color = focused ? '#069A8E' : '#fff';
                    if (route.name === 'Gasto Viaje') {
                        iconName = 'file-invoice-dollar'
                    } else if (route.name === 'Historial') {
                        iconName = 'history'
                    } else if (route.name === 'Solicitar Proveedor') {
                        iconName = 'user-plus';
                    } else if (route.name === 'No Sincronizado') {
                        iconName = 'sync';
                    }

                    return <FontAwesome5Icon name={iconName} size={IconosBottomTab} color={color} />
                },
                tabBarActiveTintColor: '#069A8E',
                tabBarInactiveTintColor: '#fff',
                tabBarActiveBackgroundColor: '#fff',
                tabBarInactiveBackgroundColor: '#069A8E',
                tabBarStyle: { height: '9%' },
                tabBarLabelStyle: { paddingBottom: 10, fontWeight: 'bold', fontSize: LabelBottomTab },
                tabBarIconStyle: { marginTop: 5 },
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarLabelPosition: 'below-icon',
            })}>
                <Tab.Screen name="Gasto Viaje" component={GastoViajeScreen} />
                <Tab.Screen name="Historial" component={HistorialScreen} />
                <Tab.Screen name="Solicitar Proveedor" component={ProveedorScreen} />
                <Tab.Screen name="No Sincronizado" component={NoSyncScreen} />
            </Tab.Navigator>
        </>
    )
}

export default BottomTabNavigation;