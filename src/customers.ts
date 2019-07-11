import { Fortnox } from ".";
import { Dispatch } from "./dispatch";

export class Customers{
    private api: Fortnox;
    private dispatch: Dispatch;

    constructor(api: Fortnox){
        this.api = api;
        this.dispatch = new Dispatch(api);
    }

    async get(customerNumber: string) {
        const result: any = await this.dispatch.get(`customers/${customerNumber}`);
        return result.Customer;
    }

    async getAll(filter?: string) {
        let path = 'customers/';
        if (filter)
            path += '?filter=' + filter;
        const result: any = await this.dispatch.get(path);
        return result.Customers;
    }

    async create(customer: any) {
        const result = await this.dispatch.post('customers', { Customer: customer });
        return result.Customer;
    }

    async update(customer: any) {
        const result = await this.dispatch.put(`customers/${customer.CustomerNumber}`, { Customer: customer });
        return result.Customer;
    }

    async remove(customerNumber: string) {
        return await this.dispatch.delete(`customers/${customerNumber}`);
    }
}