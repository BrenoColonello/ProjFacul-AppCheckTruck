import { EntidadeBase } from "./entidadeBase";
import { Veiculo } from "./veiculo";

export interface Motorista extends EntidadeBase {
    nome: string;
    dataContratacao: Date;
    cnh : string;
    veiculo: Veiculo
}