import { PixelRatio } from "react-native";
const TextoPantallas = PixelRatio.getFontScale() * 15.22;//16 - 2
const TextoHeader = PixelRatio.getFontScale() * 17.39;//18 - 2
const TextButtons = PixelRatio.getFontScale() * 19.57;//20 - 2
const ObjectHeigth = PixelRatio.getFontScale()*35.87;//35 - 2
const FontFamily = 'sans-serif';

export { TextoPantallas, TextoHeader, TextButtons, FontFamily ,ObjectHeigth}