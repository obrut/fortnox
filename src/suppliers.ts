import { Dispatch } from './dispatch';
import { Util } from './utils';

export class Suppliers {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'suppliers';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(supplierNumber?: string) {
        const result = await this.dispatch.get(this.path);
        return supplierNumber ? result.Supplier : result.Suppliers;
    }

    async getAll(filter?: string) {
        let path = this.path;
        if (filter)
            path += '?filter=' + filter;
        const result: any = await this.util.getAllPages(path, 'Suppliers', this.dispatch);
        return result;
    }

    async create(supplier: any) {
        const result = await this.dispatch.post(this.path, { Supplier: supplier });
        return result.Supplier;
    }

    async remove(supplierNumber: string) {
        const result = await this.update( { SupplierNumber: supplierNumber, Active: false } );
        return result.Active === false;
    }

    async update(supplier: any) {
        const result = await this.dispatch.put(`${this.path}/${supplier.SupplierNumber}`, { Supplier: supplier });
        return result.Supplier;
    }
}