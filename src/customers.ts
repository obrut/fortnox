import { Fortnox } from ".";

export class Customers{
    api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }

    async get(selector?: { customerNumber?: string, filter?: string }) {
        let path = 'customers/';
        path += (selector && selector.customerNumber) || '';
        path += (selector && selector.filter && `?filter=${selector.filter}`) || '';

        return await this.api.dispatch.get(path);
    }

    async create(customer: any) {
        return await this.api.dispatch.post('customers', { Customer: customer });
    }

    async update(customer: any) {
        return await this.api.dispatch.put(`customers/${customer.CustomerNumber}`, { Customer: customer });
    }

    async remove(customerNumber: string) {
        return await this.api.dispatch.delete(`customers/${customerNumber}`);
    }
}