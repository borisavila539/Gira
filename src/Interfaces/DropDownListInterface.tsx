export interface DropDownListInterface{
    data : string[],
    labelFiel?: string,
    onSelect: (selectedItem: string, index: number)=> void,
    defaultButtonText: string,
    search?: boolean,
    disabled?:boolean
}