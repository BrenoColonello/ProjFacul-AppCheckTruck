import axios, {} from "axios"

export interface RespostaHttp<T> {
    status: number
    data: T
}


export class BaseApi<T> {
    /**
     *
     */
    private urlBase: string = "http://10.0.2.2:5124/api/"
    public controller: string

    constructor(controller: string) {
        this.controller = controller
    }

    public async getAll(path: string): Promise<RespostaHttp<T[]>> {
        return await axios.get(this.urlBase + this.controller + path)
    }

    public async post(path: string, data: T): Promise<RespostaHttp<T>> {
        return await axios.post(this.urlBase + this.controller + path, data)
    }

    public async put(path: string, data: any): Promise<RespostaHttp<T>> {
        return await axios.put(this.urlBase + this.controller + path, data)
    }

    public async delete<T>(path: string, id :number): Promise<RespostaHttp<T>> {
        return await axios.delete(this.urlBase + this.controller + path+"?id=" + id)
    }
    
}