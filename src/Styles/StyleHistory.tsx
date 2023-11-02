import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    containerSafeAreView: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: "center",
        paddingVertical: 2,
    },
    textInputDateContainer: {
        alignItems: "flex-start",
        width: 200,
        paddingVertical: 2,
    },
    text: {
        fontSize: 16,
        textAlign: "right",
        fontStyle: "italic",
        //fontFamily: 'sans-serif'
    },
    text2: {
        fontSize: 16,
        textAlign: "right",
        fontWeight: "bold",
        fontStyle: "normal",
        //fontFamily: 'sans-serif'
    },
    inputIconContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#30475E',
        paddingHorizontal: 5,
    },
    input: {
        width: 130,
        fontSize: 16,
        height: 35,
        borderRightWidth: 1,
        borderColor: '#30475E',
        marginRight: 5,
        color: '#121212',
        padding: 2,
        textAlign: "center",
        //fontFamily: 'sans-serif'
    },
    filters: {
        width: '100%',
        flexDirection: 'row',
    },
    filtersContainer: {
        width: '100%',
        height: 90,
        backgroundColor: '#fff'
    },
    loader: {
        width: '100%',
        alignItems: 'center'
    }
})

export { styles }