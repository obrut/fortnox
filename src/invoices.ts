import { Dispatch } from './dispatch';
import { Util } from './utils';

export class Invoices {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'invoices';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(documentNumber?: string) {
        const result = await this.dispatch.get(`${this.path}/${documentNumber || ''}`);
        return result.Invoice;
    }

    async getAll(filter: string) {
        const result: any = await this.util.getAllPages(this.path + '?filter=' + filter, 'Invoices', this.dispatch);
        return result;
    }

    async getByCustomer(customerNumber: string) {
        const allInvoices: any[] = await this.util.getAllPages(`${this.path}/`, 'Invoices', this.dispatch);
        return allInvoices.filter(invoice => invoice.CustomerNumber.toLowerCase() == customerNumber.toLowerCase());
    }

    async create(invoice: any) {
        const result = await this.dispatch.post(this.path, { Invoice: invoice })
        return result.Invoice;
    }

    async update(invoice: any) {
        const result = await this.dispatch.put(`${this.path}/${invoice.DocumentNumber}`, { Invoice: invoice });
        return result.Invoice;
    }

    async send(documentNumber: string) {
        const result = await this.dispatch.get(`${this.path}/${documentNumber}/email`);
        return result.Invoice;
    }

    async remove(documentNumber: string) {
        const result = await this.dispatch.put(`${this.path}/${documentNumber}/cancel`);
        return result.Invoice;
    }
}