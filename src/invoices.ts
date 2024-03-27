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
        const result = await this.dispatch.get<InvoiceResult>(`${this.path}/${documentNumber || ''}`);
        return result.Invoice;
    }

    async getAll(filter: string) {
        const result = await this.util.getAllPages<InvoiceResult>(this.path + '?filter=' + filter, 'Invoices', this.dispatch);
        return result;
    }

    // async getByCustomer(customerNumber: string) {
    //     const allInvoices = await this.util.getAllPages<InvoiceResult>(`${this.path}/`, 'Invoices', this.dispatch);
    //     return allInvoices.filter(invoice => invoice.Invoice.CustomerNumber.toLowerCase() == customerNumber.toLowerCase());
    // }

    async create(data: FNInvoice) {
        const result = await this.dispatch.post<InvoiceResult>(this.path, { Invoice: data });
        return result.Invoice;
    }

    async update(invoice: FNInvoice) {
        if (!invoice) {
            throw new Error('Invoice is missing');
        }
        const result = await this.dispatch.put<InvoiceResult>(`${this.path}/${invoice.DocumentNumber}`, { Invoice: invoice });
        return result.Invoice;
    }

    async send(documentNumber: string) {
        const result = await this.dispatch.get<InvoiceResult>(`${this.path}/${documentNumber}/email`);
        return result.Invoice;
    }

    async remove(documentNumber: string) {
        const result = await this.dispatch.put<InvoiceResult>(`${this.path}/${documentNumber}/cancel`);
        return result.Invoice;
    }
}