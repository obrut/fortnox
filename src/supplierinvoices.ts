import { Dispatch } from './dispatch';
import { FNSupplierInvoice } from './types/index';
import { Util } from './utils';

type SupplierInvoiceResult = {
    SupplierInvoice: FNSupplierInvoice,
    SupplierInvoices: FNSupplierInvoice[]
}

export class SupplierInvoices {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'supplierinvoices';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(givenNumber?: string) {
        const result = await this.dispatch.get<SupplierInvoiceResult>(`${this.path}/${givenNumber ?? ''}`);
        return givenNumber ? result.SupplierInvoice : result.SupplierInvoices;
    }

    async getAll(filter?: string) {
        let path = this.path;
        if (filter)
            path += '?filter=' + filter;
        const result = await this.util.getAllPages<FNSupplierInvoice>(path, this.dispatch);
        return result;
    }

    async getSpecified(givenNumbers: string[]) {
        return await Promise.all(givenNumbers.map(async (givenNumber: string) => {
            return await this.get(givenNumber);
        }));
    }

    async create(supplierInvoice: any) {
        const result = await this.dispatch.post<SupplierInvoiceResult>(this.path, { SupplierInvoice: supplierInvoice });
        return result.SupplierInvoice;
    }

    async update(supplierInvoice: any, action?: string) {
        const result = await this.dispatch.put<SupplierInvoiceResult>(`${this.path}/${supplierInvoice.GivenNumber}/${action && action || ''}`, {SupplierInvoice: supplierInvoice});
        return result.SupplierInvoice;
    }

    async remove(givenNumber: string) {
        const result = await this.update({ GivenNumber: givenNumber }, 'cancel');
        return result.Cancelled;
    }
}