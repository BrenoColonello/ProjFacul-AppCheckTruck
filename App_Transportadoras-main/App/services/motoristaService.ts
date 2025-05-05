import { Motorista } from "@/interfaces/motorista";
import { BaseApi } from "./baseService";

const motoristaService = new BaseApi<Motorista>("Motorista");
export default motoristaService;