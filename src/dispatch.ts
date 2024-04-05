import axios from 'axios';
import { Defaults } from './types/defaults';

export class Dispatch {
    private host: string;
    private defaults: Defaults;

    constructor(config: {Host: string, Defaults: Defaults}) {
        this.host = config.Host,
        this.defaults = config.Defaults
    }
    
    async get<T>(path?: string) {
        const response = await axios.get<T>(`${this.host}${path}`, { headers: this.defaults.headers });
        if (response.status === 200)
            return response.data;
        throw new Error(response.statusText);
    }

    async post<T>(path: string, body: any) {
        const response = await axios.post<T>(`${this.host}${path}`, body, { headers: this.defaults.headers });
        if (response.status === 201)
            return response.data;
        throw new Error(response.statusText);
    }

    async put<T>(path: string, body?: any) {
        const response = await axios.put<T>(`${this.host}${path}`, body, { headers: this.defaults.headers });
        if (response.status === 200)
            return response.data;
        throw new Error(response.statusText);
    }

    async delete(path: string) {
        const response = await axios.delete(`${this.host}${path}`, { headers: this.defaults.headers });
        if (response && response.status === 204)
            return true;
        throw new Error(response.statusText);
    }
}