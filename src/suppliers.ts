import { Dispatch } from './dispatch';
import { FNSupplier } from './types/index';
import { Util } from './utils';

type SupplierResult = {
    Supplier: FNSupplier,
    Suppliers: FNSupplier[]
}

export class Suppliers {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'suppliers';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(supplierNumber?: string) {
        const result = await this.dispatch.get<SupplierResult>(this.path);
        return supplierNumber ? result.Supplier : result.Suppliers;
    }

    async getAll(filter?: string) {
        let path = this.path;
        if (filter)
            path += '?filter=' + filter;
        const result = await this.util.getAllPages(path, this.dispatch) as FNSupplier[];
        return result;
    }

    async create(supplier: any) {
        const result = await this.dispatch.post<SupplierResult>(this.path, { Supplier: supplier });
        return result.Supplier;
    }

    async remove(supplierNumber: string) {
        const result = await this.update( { SupplierNumber: supplierNumber, Active: false } );
        return result.Active === false;
    }

    async update(supplier: any) {
        const result = await this.dispatch.put<SupplierResult>(`${this.path}/${supplier.SupplierNumber}`, { Supplier: supplier });
        return result.Supplier;
    }
}