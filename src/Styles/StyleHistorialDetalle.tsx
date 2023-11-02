import { StyleSheet } from "react-native";
import { TextoPantallas } from "../Constants/Texto";
import { ImageHeigth, ImageWidth } from "../Constants/HistorialDetalle";

const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffff',
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: TextoPantallas,
        fontWeight: 'bold',
        textAlign: "center",
        //fontFamily: 'sans-serif'
    },
    text2: {
        fontSize: TextoPantallas,
        fontWeight: "normal",
        fontStyle: "italic",
        textAlign: "center",
        //fontFamily: 'sans-serif'
    },
    containerDetalle: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    containerDetalle2: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#069A8E'
    },
    containerInfo: {
        width: '70%',
        maxWidth: 500,
        borderTopWidth: 1,
        paddingVertical: 10
    },
    image: {
        width: ImageWidth,
        height: ImageHeigth,
        marginBottom: 10,
        resizeMode: 'contain',

    },
    modal: {
        backgroundColor: '#00000099',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    hideimage: {
        flex: 1,
        borderWidth: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    imageModal: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
})

export {styles}