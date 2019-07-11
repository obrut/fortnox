import { Fortnox } from '.';

export class Invoices {
    private api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }

    async get(documentNumber?: string) {
        const result = await this.api.dispatch.get(`invoices/${documentNumber || ''}`);
        return result.Invoice;
    }

    async create(invoice: any) {
        const result = await this.api.dispatch.post('invoices', { Invoice: invoice })
        return result.Invoice;
    }

    async send(documentNumber: string) {
        const result = await this.api.dispatch.put(`invoices/${documentNumber}/email`, null);
        return result.Invoice;
    }

    async update(invoice: any) {
        const result = await this.api.dispatch.put(`invoices/${invoice.DocumentNumber}`, { Invoice: invoice });
        return result.Invoice;
    }

    async remove(documentNumber: string) {
        return await this.api.dispatch.get(`invoices/${documentNumber}/cancel`);
    }
}