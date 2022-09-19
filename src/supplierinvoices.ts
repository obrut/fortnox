import { Dispatch } from './dispatch';
import { FNSupplierInvoice } from './types/FNSupplierInvoice';
import { Util } from './utils';

type SupplierInvoiceResult = {
    SupplierInvoice: FNSupplierInvoice,
    SupplierInvoices: FNSupplierInvoice[]
}

export class SupplierInvoices {
    private dispatch: Dispatch;
    private path = 'supplierinvoices';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
    }

    async get(givenNumber?: string) {
        const result = await this.dispatch.get(`${this.path}/${givenNumber || ''}`) as SupplierInvoiceResult;
        return givenNumber ? result.SupplierInvoice : result.SupplierInvoices;
    }

    async getAll(filter?: string) {
        const result = await Util.getAllPages(this.path, 'SupplierInvoices', this.dispatch, filter) as FNSupplierInvoice[];
        return result;
    }

    async getSpecified(givenNumbers: string[]) {
        return await Promise.all(givenNumbers.map(async (givenNumber: string) => {
            return await this.get(givenNumber);
        }));
    }

    async create(supplierInvoice: any) {
        const result = await this.dispatch.post(this.path, { SupplierInvoice: supplierInvoice }) as SupplierInvoiceResult;
        return result.SupplierInvoice;
    }

    async update(supplierInvoice: any, action?: string) {
        const result = await this.dispatch.put(`${this.path}/${supplierInvoice.GivenNumber}/${action && action || ''}`, {SupplierInvoice: supplierInvoice}) as SupplierInvoiceResult;
        return result.SupplierInvoice;
    }

    async remove(givenNumber: string) {
        const result = await this.update({ GivenNumber: givenNumber }, 'cancel');
        return result.Cancelled;
    }
}