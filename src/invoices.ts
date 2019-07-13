import { Dispatch } from './dispatch';
import { Util } from './utils';

export class Invoices {
    private dispatch: Dispatch;
    private util: Util;

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(documentNumber?: string) {
        const result = await this.dispatch.get(`invoices/${documentNumber || ''}`);
        return result.Invoice;
    }

    async getByCustomer(customerNumber: string) {
        const allInvoices: any[] = await this.util.getAllPages('invoices/', 'Invoices', this.dispatch);
        
        return allInvoices.filter(invoice => invoice.CustomerNumber.toLowerCase() == customerNumber.toLowerCase());
    }

    async create(invoice: any) {
        const result = await this.dispatch.post('invoices', { Invoice: invoice })
        return result.Invoice;
    }

    async update(invoice: any) {
        const result = await this.dispatch.put(`invoices/${invoice.DocumentNumber}`, { Invoice: invoice });
        return result.Invoice;
    }

    async send(documentNumber: string) {
        const result = await this.dispatch.get(`invoices/${documentNumber}/email`);
        return result.Invoice;
    }

    async remove(documentNumber: string) {
        return await this.dispatch.get(`invoices/${documentNumber}/cancel`);
    }
}