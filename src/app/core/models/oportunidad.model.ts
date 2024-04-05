<<<<<<< HEAD
export class OportunidadModel {
    constructor(
        public nameOportunity: string,
        public descriptionOportunity: string,
        public stateOportunity: string,
        public userCreate: string,
        public userGestor: string | null,
        public userCliente: string,
        public createdAt?: Date,
        public updateAt?: Date,
=======
import { InteraccionModel } from "./interaccion.model";

export class OportunidadModel {
    constructor(
        public nomOportunidad: string,
        public descripcion: string,
        public estado: string,
        public usuarioCreador: string,
        public usuarioGestor: string | null,
        public usuarioAsignado: string,
        public interacciones: InteraccionModel["_id"][],
        public createdAt?: Date,
        public updatedAt?: Date,
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
        public readonly _id?: string
    ) {}
}