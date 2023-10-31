import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../Navigation/Navigation"

export interface HeaderInterface{
    GoBack: boolean,
    navigation: StackNavigationProp<RootStackParams>
}

