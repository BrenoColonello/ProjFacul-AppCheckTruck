import { EntidadeBase } from "./entidadeBase";
import { motorista } from "./motorista";

export interface Veiculo extends EntidadeBase {
    placa: string;
    quilometragem: number;
    chassi: string;
    motorista: motorista
    motoristaId: number;

}