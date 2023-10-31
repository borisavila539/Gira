export interface TipoGasto {
    $id: string,
    Id: number,
    Nombre: string,
    Diario: string,
    Empresa: string,
    Activo: boolean
}

export interface CategoriaGasto {
    $id: string
    idCategoriaTipoGastoViaje: number
    IdTipoGastoViaje: number
    TipoNombre: string
    Empresa: string
    CategoriaNombre: string
    ProveedorPredefinido: string
    GrupoImpuesto: any
    CuentaContrapartida: string
    FacturaObligatoria: boolean
    Descripcion: boolean
    imagen: boolean
    activo: boolean
}