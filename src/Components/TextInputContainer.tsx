import { StyleSheet, View, Text, TextInput } from "react-native";
import { TextoPantallas } from "../Constants/Texto";
import { TextInputContainerInterface } from "../Interfaces/TextInputContainerInterface";


const TextInputContainer = ({title,justify,height,placeholder,tecladoNUm,multiline,editable,onchangeText,value,maxlength}:TextInputContainerInterface) => {

    return (
        <View style={styles.textInput}>
            <Text style={styles.text}>{title}</Text>
            <TextInput
                style={[styles.input, { textAlign: justify ? 'justify' : 'center', height: height }]}
                placeholder={placeholder}
                keyboardType={tecladoNUm?'decimal-pad':'default'}
                multiline={multiline}
                editable={editable}
                onChangeText={onchangeText}
                value={value}
                maxLength={maxlength}
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: TextoPantallas,
        fontWeight: 'bold',
        color: '#005555',
        //fontFamily: 'sans-serif'
    },
    textInput: {
        width: '100%',
        padding: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 100,
        fontSize: 18,
        backgroundColor: '#f0f0f0',
        height: 35,
        borderColor: '#30475E',
        color: '#121212',
        padding: 2,
        //fontFamily: 'sans-serif'
    }
})

export default TextInputContainer;