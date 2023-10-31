import { GiraState } from "./GiraContext"

type GiraAction =
    | { type: 'changeUsuarioID', payload: string }
    | { type: 'changeNombre', payload: string }
    | { type: 'changeEmpresa', payload: string }
    | { type: 'changeDocumentoFiscal', payload: string }
    | { type: 'changeMonedaAbriaviacion', payload: string }
    | { type: 'changeMoneda', payload: string }
    | {type: 'changeLogeado', payload: boolean}


export const GiraReducer = (state: GiraState, action: GiraAction): GiraState => {
    switch (action.type) {
        case 'changeUsuarioID':
            return {
                ...state,
                UsuarioID: action.payload
            }
        case 'changeNombre':
            return {
                ...state,
                Nombre: action.payload
            }
        case 'changeEmpresa':
            return {
                ...state,
                Empresa: action.payload
            }
        case 'changeDocumentoFiscal':
            return {
                ...state,
                DocumentoFiscal: action.payload
            }
        case 'changeMonedaAbriaviacion':
            return {
                ...state,
                MonedaAbreviacion: action.payload
            }
        case 'changeMoneda':
            return {
                ...state,
                Moneda: action.payload
            }
        case 'changeLogeado':
            return{
                ...state,
                logeado: action.payload
            }
        default:
            return state;
    }
}

