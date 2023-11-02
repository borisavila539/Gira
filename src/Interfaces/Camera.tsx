export interface cameraInterface {
    modalVisible: boolean,
    onRequestCloseImage: () => void,
    OnPressUploadImage: () => void,
    imagen: string,
    modalCameraUpload: boolean,
    onRequestCloseSelectUploadImage: () => void,
    onPressOut: () => void,
    onPressCameraUpload: () => void,
    OnPressUpLoadImage: () => void,
    onPressModalCameraUpload: () => void,
    modalImage: () => void

}