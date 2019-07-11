import { Fortnox } from ".";

export class Customers{
    api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }

    async get(customerNumber: string) {
        const result: any = await this.api.dispatch.get(`customers/${customerNumber}`);
        return result.Customer;
    }

    async getAll(filter?: string) {
        let path = 'customers/';
        if (filter)
            path += '?filter=' + filter;
        const result: any = await this.api.dispatch.get(path);
        return result.Customers;
    }

    async create(customer: any) {
        const result = await this.api.dispatch.post('customers', { Customer: customer });
        return result.Customer;
    }

    async update(customer: any) {
        const result = await this.api.dispatch.put(`customers/${customer.CustomerNumber}`, { Customer: customer });
        return result.Customer;
    }

    async remove(customerNumber: string) {
        return await this.api.dispatch.delete(`customers/${customerNumber}`);
    }
}