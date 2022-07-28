import { Dispatch } from "./dispatch";
import { FNCustomer } from "./types/FNCustomer";
import { Util } from "./utils";

type CustomerResult = {
    Customer: FNCustomer
}

export class Customers {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'customers'

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(customerNumber: string) {
        const result = await this.dispatch.get(`${this.path}/${customerNumber}`) as CustomerResult;
        return result.Customer;
    }

    async getAll(filter?: string) {
        let path = this.path;
        if (filter)
            path += '?filter=' + filter;
        const result = await this.util.getAllPages(path, 'Customers', this.dispatch) as FNCustomer[];
        return result;
    }

    // Will return first hit, email is not unique, only CustomerNumber is, this is best effort
    async getByEmail(email: string) {
        const allCustomers = await this.getAll('active') as FNCustomer[];
        return allCustomers.filter((customer: FNCustomer) => customer.Email?.toLowerCase().includes(email.toLowerCase()));
    }

    async create(customer: any) {
        const result = await this.dispatch.post(this.path, { Customer: customer }) as CustomerResult;
        return result.Customer;
    }

    async update(customer: any) {
        const result = await this.dispatch.put(`${this.path}/${customer.CustomerNumber}`, { Customer: customer }) as CustomerResult;
        return result.Customer;
    }

    async remove(customerNumber: string) {
        return await this.dispatch.delete(`${this.path}/${customerNumber}`);
    }
}