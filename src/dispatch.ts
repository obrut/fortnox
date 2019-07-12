import fetch from 'node-fetch';
import { Fortnox } from '.';

export class Dispatch {
    private host: string;
    private defaults: any;

    constructor(config: {Host: string, Defaults: any}) {
        this.host = config.Host,
        this.defaults = config.Defaults
    }
    
    async get(path?: string) {
        const response = await fetch(`${this.host}${path}`, { method: 'GET', headers: this.defaults.headers });
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return result;
    }

    async post(path: string, body: any) {
        const response = await fetch(`${this.host}${path}`, { method: 'POST', headers: this.defaults.headers, body: JSON.stringify(body, null, 4) });
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return result;
    }

    async put(path: string, body: any) {
        const response = await fetch(`${this.host}${path}`, { method: 'PUT', headers: this.defaults.headers, body: JSON.stringify(body, null, 4) });
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return result;
    }

    async delete(path: string) {
        const response = await fetch(`${this.host}${path}`, { method: 'DELETE', headers: this.defaults.headers });
        if (response && response.status === 204)
            return response.ok;
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return;
    }
}