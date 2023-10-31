export interface TextInputContainerInterface{
    title: string,
    justify?: boolean,
    height: number
    placeholder?:string,
    tecladoNUm: boolean,
    multiline?:boolean,
    editable: boolean,
    onchangeText?: (value:string)=> void,
    value: string,
    maxlength?: number
}