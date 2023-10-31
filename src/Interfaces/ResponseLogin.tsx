export interface ResponseLogin {
    $id: string
    Data: Data
    Type: string
    Message: string
  }
  
  export interface Data {
    $id: string
    Token: string
    Usuario: Usuario
    Empresa: string
    Nombre: string
    Accesos: any
  }
  
  export interface Usuario {
    $id: string
    IdUsuario: string
    Pin: any
  }