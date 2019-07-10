import { Fortnox } from '.';

export class Invoices {
    private api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }

    async get(documentNumber?: string) {
        return await this.api.dispatch.get(`invoices/${documentNumber || ''}`);
    }

    async create(invoice: any) {
        return await this.api.dispatch.post('invoices', { Invoice: invoice })
    }

    async send(documentNumber: string) {
        return await this.api.dispatch.get(`invoices/${documentNumber}/email`);
    }

    async update(invoice: any) {
        return await this.api.dispatch.put(`invoices/${invoice.DocumentNumber}`, { Invoice: invoice });
    }

    async remove(documentNumber: string) {
        return await this.api.dispatch.get(`invoices/${documentNumber}/cancel`);
    }
}