import { Dispatch } from './dispatch';
import { FNInvoice } from './types/FNInvoice';
import { Util } from './utils';

type InvoiceResult = {
    Invoice: FNInvoice
}

export class Invoices {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'invoices';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(documentNumber?: string) {
        const result = await this.dispatch.get(`${this.path}/${documentNumber || ''}`) as InvoiceResult;
        return result.Invoice;
    }

    async getAll(filter: string) {
        const result = await this.util.getAllPages(this.path + '?filter=' + filter, 'Invoices', this.dispatch) as InvoiceResult[];
        return result;
    }

    async getByCustomer(customerNumber: string) {
        const allInvoices = await this.util.getAllPages(`${this.path}/`, 'Invoices', this.dispatch);
        return allInvoices.filter(invoice => invoice.CustomerNumber.toLowerCase() == customerNumber.toLowerCase());
    }

    async create(data: FNInvoice) {
        const result = await this.dispatch.post(this.path, { Invoice: data }) as InvoiceResult;
        return result.Invoice as FNInvoice;
    }

    async update(invoice: FNInvoice) {
        if (!invoice) {
            throw new Error('Invoice is missing');
        }
        const result = await this.dispatch.put(`${this.path}/${invoice.DocumentNumber}`, { Invoice: invoice }) as InvoiceResult;
        return result.Invoice;
    }

    async send(documentNumber: string) {
        const result = await this.dispatch.get(`${this.path}/${documentNumber}/email`) as InvoiceResult;
        return result.Invoice;
    }

    async remove(documentNumber: string) {
        const result = await this.dispatch.put(`${this.path}/${documentNumber}/cancel`) as InvoiceResult;
        return result.Invoice;
    }
}