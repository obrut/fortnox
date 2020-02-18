import { Dispatch } from './dispatch';
import { Util } from './utils';

export class SupplierInvoices {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'supplierinvoices';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(givenNumber?: string) {
        const result = await this.dispatch.get(`${this.path}/${givenNumber || ''}`);
        return givenNumber ? result.SupplierInvoice : result.SupplierInvoices;
    }

    async getAll(filter?: string) {
        let path = this.path;
        if (filter)
            path += '?filter=' + filter;
        const result: any = await this.util.getAllPages(path, 'SupplierInvoices', this.dispatch);
        return result;
    }

    async getSpecified(givenNumbers: string[]) {
        return await Promise.all(givenNumbers.map(async (givenNumber: string) => {
            return await this.get(givenNumber);
        }));
    }

    async create(supplierInvoice: any) {
        const result = await this.dispatch.post(this.path, { SupplierInvoice: supplierInvoice });
        return result.SupplierInvoice;
    }

    async update(supplierInvoice: any, action?: string) {
        const result = await this.dispatch.put(`${this.path}/${supplierInvoice.GivenNumber}/${action && action || ''}`, {SupplierInvoice: supplierInvoice});
        return result.SupplierInvoice;
    }

    async remove(givenNumber: string) {
        const result = await this.update({ GivenNumber: givenNumber }, 'cancel');
        return result.Cancelled;
    }
}