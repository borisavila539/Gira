import { createContext, useReducer } from "react"
import { GiraReducer } from "./GiraReducer"

export interface GiraState {
    UsuarioID: string,
    Nombre: string,
    Empresa: string,
    DocumentoFiscal: string,
    MonedaAbreviacion: string,
    Moneda: string,
    logeado:boolean,
    CantNoSync: number
}

export const GiraInitialState: GiraState = {
    UsuarioID: '',
    Nombre: '',
    Empresa: '',
    DocumentoFiscal:'',
    MonedaAbreviacion: '',
    Moneda:'',
    logeado: false,
    CantNoSync:0
}

export interface GiraContextProps {
    GiraState: GiraState,
    changeUsuarioID: (usuarioID: string) => void,
    changeNombre: (nombre: string) => void,
    changeEmpresa: (empresa: string) => void,
    changeDocumentoFiscal: (DocumentoFiscal:string) => void
    changeMonedaAbriaviacion: (MonedaAbreviacion:string) => void,
    changeMoneda: (Moneda: string) => void,
    changeLogeado: (logeado: boolean) => void
    changeCatNoSync:(nosync: number)=> void
}

export const GiraContext = createContext({} as GiraContextProps)

export const GiraProvider = ({ children }: any) => {
    const [GiraState, dispatch] = useReducer(GiraReducer, GiraInitialState)

    const changeUsuarioID = (usuarioID: string) => {
        dispatch({ type: 'changeUsuarioID', payload: usuarioID })
    }
    const changeNombre = (nombre: string) => {
        dispatch({ type: 'changeNombre', payload: nombre })
    }
    const changeEmpresa = (empresa: string) => {
        dispatch({ type: 'changeEmpresa', payload: empresa })
    }
    const changeDocumentoFiscal = (DocumentoFiscal: string) => {
        dispatch({ type: 'changeDocumentoFiscal', payload: DocumentoFiscal })
    }
    const changeMonedaAbriaviacion = (MonedaAbreviacion: string) => {
        dispatch({ type: 'changeMonedaAbriaviacion', payload: MonedaAbreviacion })
    }
    const changeMoneda = (Moneda: string) => {
        dispatch({ type: 'changeMoneda', payload: Moneda })
    }
    const changeLogeado = (logeado: boolean)=>{
        dispatch({type: 'changeLogeado', payload: logeado})
    }
    const changeCatNoSync=(nosync: number)=>{
        dispatch({type: 'changeCantnoSync', payload: nosync})
        
    }


    return (
        <GiraContext.Provider value={{
            GiraState,
            changeUsuarioID,
            changeNombre,
            changeEmpresa,
            changeDocumentoFiscal,
            changeMonedaAbriaviacion,
            changeMoneda,
            changeLogeado,
            changeCatNoSync
        }}>
            {children}
        </GiraContext.Provider>
    )
}