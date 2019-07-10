import fetch from 'node-fetch';
import { Fortnox } from '.';

export class Dispatch {
    private api: Fortnox;

    constructor(api: Fortnox) {
        this.api = api;
    }
    
    async get(path?: string) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'GET', headers: this.api.defaults.headers });
        return await response.json();
    }

    async post(path: string, body: any) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'POST', headers: this.api.defaults.headers, body: JSON.stringify(body, null, 4) });
        return await response.json();
    }

    async put(path: string, body: any) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'PUT', headers: this.api.defaults.headers, body: JSON.stringify(body, null, 4) });
        return await response.json();
    }

    async delete(path: string) {
        const response = await fetch(`${this.api.host}${path}`, { method: 'DELETE', headers: this.api.defaults.headers });
        return;
    }
}