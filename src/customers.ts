import { Fortnox } from ".";

export class Customers{
    api: Fortnox;
    constructor(api: Fortnox){
        this.api = api;
    }

    async get(customerNumber?: string) {
        return await this.api.dispatch.get(`customers/${customerNumber || ''}`);
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