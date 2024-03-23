import { OportunidadModel } from "./oportunidad.model";

export class InteraccionModel {
    constructor(
        public refInteraccion: OportunidadModel["_id"],
        public descripcion: string,
        public accion: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public readonly _id?: string
    ) {}
}