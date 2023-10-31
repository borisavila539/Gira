import { StyleSheet, View } from "react-native"
import { ObjectHeigth, TextoPantallas } from "../Constants/Texto";
import SelectDropdown from "react-native-select-dropdown";
import { DropDownListInterface } from "../Interfaces/DropDownListInterface";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { IconSelect } from "../Constants/BottomTab";

function Icon() {
    return (
        <FontAwesome5Icon name="caret-down" size={IconSelect} color={'#1A4D2E'} />
    )
}

function iconFind() {
    return (
        <FontAwesome5Icon name="search" size={IconSelect} color={'#1A4D2E'} />
    )
}

const DropDownList = ({ data, onSelect, defaultButtonText, search, disabled }: DropDownListInterface) => {
    return (
        <View style={styles.container}>
            <SelectDropdown
                data={data}
                onSelect={onSelect}
                buttonTextAfterSelection={(selectedItem: string, index: number) => {
                    return selectedItem
                }}
                defaultButtonText={defaultButtonText}
                buttonStyle={styles.button}
                renderDropdownIcon={() => Icon()}
                search={search}
                searchPlaceHolder="Buscar por nombre"
                renderSearchInputLeftIcon={iconFind}
                disableAutoScroll={true}
                disabled={disabled}
                rowTextStyle={{ fontSize: TextoPantallas }}
                buttonTextStyle={{ fontSize: TextoPantallas }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    button: {
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#30475E',
        backgroundColor: '#f0f0f0',
        height: ObjectHeigth,
        width: '100%'
    }
})

export default DropDownList;