export class UsuarioModel{
    constructor(
    public readonly _id:string,
    public nombre: string,
    public email: string,
    public telefono: string,
    public direccion: string,
    public tDocumento: string,
    public nDocumento: string,
    public login: string,
    public password: string,
    public rol: string,
    public estado: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    )
    {}
}