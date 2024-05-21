import { Pregunta } from "./pregunta";

export interface DetallePreguntas {
    questions: Pregunta[];
    total: number;
    page: number;
    perPage: number;
}
