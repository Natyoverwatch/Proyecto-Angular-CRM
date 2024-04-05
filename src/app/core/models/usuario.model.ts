export class UsuarioModel{
    constructor(
        public nombre: string,
        public email: string,
<<<<<<< HEAD
        public celular: number,
        public direccion: string,
        public tipoDocumento: string,
        public numeroDocumento: string,
=======
        public telefono: string,
        public direccion: string,
        public tDocumento: string,
        public nDocumento: string,
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
        public login: string,
        public password: string,
        public rol?: string,
        public estado?: boolean,
        public createdAt?: Date,
<<<<<<< HEAD
        public updateAt?: Date,
=======
        public updatedAt?: Date,
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
        public readonly _id?:string,
    )
    {}
}