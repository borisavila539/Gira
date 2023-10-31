export interface AlertInterface{
    visible: boolean,
    tipoMensaje: boolean,
    mensajeAlerta: string,
    onPress: () => void,
    onPressCancel?: () => void
}