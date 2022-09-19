import { Dispatch } from './dispatch';
import { FNSupplier } from './types/FNSupplier';
import { Util } from './utils';

type SupplierResult = {
    Supplier: FNSupplier
}

export class Suppliers {
    private dispatch: Dispatch;
    private path = 'suppliers';

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
    }

    async get(supplierNumber: string) {
        const result = await this.dispatch.get(`${this.path}/${supplierNumber}`) as SupplierResult;
        return result.Supplier;
    }

    async getAll(filter?: string) {
        const result = await Util.getAllPages(this.path, 'Suppliers', this.dispatch, filter) as FNSupplier[];
        return result;
    }

    async create(supplier: any) {
        const result = await this.dispatch.post(this.path, { Supplier: supplier }) as SupplierResult;
        return result.Supplier;
    }

    async remove(supplierNumber: string) {
        const result = await this.update( { SupplierNumber: supplierNumber, Active: false } ) as FNSupplier;
        return result.Active === false;
    }

    async update(supplier: any) {
        const result = await this.dispatch.put(`${this.path}/${supplier.SupplierNumber}`, { Supplier: supplier }) as SupplierResult;
        return result.Supplier;
    }
}