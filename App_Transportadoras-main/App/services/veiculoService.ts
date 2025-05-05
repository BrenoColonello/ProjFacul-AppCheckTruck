import { Veiculo } from "@/interfaces/veiculo";
import { BaseApi } from "./baseService";

const veiculoService = new BaseApi<Veiculo>("Veiculo");
export default veiculoService;