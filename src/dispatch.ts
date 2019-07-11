import fetch from 'node-fetch';
import { Fortnox } from '.';

export class Dispatch {
    private api: Fortnox;

    constructor(api: Fortnox) {
        this.api = api;
    }
    
    async get(path?: string) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'GET', headers: this.api.defaults.headers });
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return result;
    }

    async post(path: string, body: any) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'POST', headers: this.api.defaults.headers, body: JSON.stringify(body, null, 4) });
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return result;
    }

    async put(path: string, body: any) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'PUT', headers: this.api.defaults.headers, body: JSON.stringify(body, null, 4) });
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return result;
    }

    async delete(path: string) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'DELETE', headers: this.api.defaults.headers });
        if (response && response.status === 204)
            return response.ok;
        const result = await response.json();
        if(result.ErrorInformation)
            throw result.ErrorInformation.message;
        return;
    }
}