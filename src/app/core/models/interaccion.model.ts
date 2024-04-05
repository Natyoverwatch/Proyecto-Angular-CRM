import { OportunidadModel } from "./oportunidad.model";
<<<<<<< HEAD
import { UsuarioModel } from "./usuario.model";

export class InteraccionModel {
    constructor(
        public refOportunity: OportunidadModel["_id"],
        public descriptionInteraction: string,
        public actionInteraction: string,
        public userCreate?: UsuarioModel["_id"],
        public createdAt?: Date,
        public updateAt?: Date,
=======

export class InteraccionModel {
    constructor(
        public refInteraccion: OportunidadModel["_id"],
        public descripcion: string,
        public accion: string,
        public createdAt?: Date,
        public updatedAt?: Date,
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
        public readonly _id?: string
    ) {}
}