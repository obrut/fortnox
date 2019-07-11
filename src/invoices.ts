import { Fortnox } from '.';
import { Dispatch } from './dispatch';

export class Invoices {
    private api: Fortnox;
    private dispatch: Dispatch;

    constructor(api: Fortnox){
        this.api = api;
        this.dispatch = new Dispatch(api);
    }

    async get(documentNumber?: string) {
        const result = await this.dispatch.get(`invoices/${documentNumber || ''}`);
        return result.Invoice;
    }

    async create(invoice: any) {
        const result = await this.dispatch.post('invoices', { Invoice: invoice })
        return result.Invoice;
    }

    async send(documentNumber: string) {
        const result = await this.dispatch.put(`invoices/${documentNumber}/email`, null);
        return result.Invoice;
    }

    async update(invoice: any) {
        const result = await this.dispatch.put(`invoices/${invoice.DocumentNumber}`, { Invoice: invoice });
        return result.Invoice;
    }

    async remove(documentNumber: string) {
        return await this.dispatch.get(`invoices/${documentNumber}/cancel`);
    }
}