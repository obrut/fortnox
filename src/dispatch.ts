import fetch from 'node-fetch';
import { Defaults } from './types/defaults';

export class Dispatch {
    private host: string;
    private defaults: Defaults;

    constructor(config: {Host: string, Defaults: Defaults}) {
        this.host = config.Host,
        this.defaults = config.Defaults
    }
    
    async get(path?: string) {
        const response = await fetch(`${this.host}${path}`, { method: 'GET', headers: this.defaults.headers });
        if (response.status === 200)
            return await response.json() as object;
        throw new Error(response.statusText);
    }

    async post(path: string, body: any) {
        const response = await fetch(`${this.host}${path}`, { method: 'POST', headers: this.defaults.headers, body: JSON.stringify(body, null, 4) });
        if (response.status === 201)
            return await response.json() as object;
        throw new Error(response.statusText);
    }

    async put(path: string, body?: any) {
        const response = await fetch(`${this.host}${path}`, { method: 'PUT', headers: this.defaults.headers, body: body && JSON.stringify(body, null, 4) });
        if (response.status === 200)
            return await response.json() as object;
        throw new Error(response.statusText);
    }

    async delete(path: string) {
        const response = await fetch(`${this.host}${path}`, { method: 'DELETE', headers: this.defaults.headers });
        if (response && response.status === 204)
            return response.ok;
        throw new Error(response.statusText);
    }
}