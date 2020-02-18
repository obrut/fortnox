import { Dispatch } from "./dispatch";
import { Util } from "./utils";

export class Customers {
    private dispatch: Dispatch;
    private util: Util;
    private path = 'customers'

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
        this.util = new Util();
    }

    async get(customerNumber: string) {
        const result: any = await this.dispatch.get(`${this.path}/${customerNumber}`);
        return result.Customer;
    }

    async getAll(filter?: string) {
        let path = this.path;
        if (filter)
            path += '?filter=' + filter;
        const result: any = await this.util.getAllPages(path, 'Customers', this.dispatch);
        return result;
    }

    async getByEmail(email: string) {
        const allCustomers = await this.getAll('active');
        return allCustomers.filter((customer: any) => customer.Email.toLowerCase().indexOf(email.toLowerCase()) > -1);
    }

    async create(customer: any) {
        const result = await this.dispatch.post(this.path, { Customer: customer });
        return result.Customer;
    }

    async update(customer: any) {
        const result = await this.dispatch.put(`${this.path}/${customer.CustomerNumber}`, { Customer: customer });
        return result.Customer;
    }

    async remove(customerNumber: string) {
        return await this.dispatch.delete(`${this.path}/${customerNumber}`);
    }
}