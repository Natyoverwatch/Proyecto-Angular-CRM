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
        public readonly _id?: string
    ) {}
}