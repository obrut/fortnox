import { Dispatch } from "./dispatch";
import { FNCustomer } from "./types/FNCustomer";
import { Util } from "./utils";

type CustomerResult = {
    Customer: FNCustomer
}

export class Customers {
    private dispatch: Dispatch;
    private path = 'customers'

    constructor(dispatch: Dispatch){
        this.dispatch = dispatch;
    }

    async get(customerNumber: string) {
        const result = await this.dispatch.get(`${this.path}/${customerNumber}`) as CustomerResult;
        return result.Customer;
    }

    async getAll(filter?: string) {
        const result = await Util.getAllPages(this.path, 'Customers', this.dispatch, filter) as FNCustomer[];
        return result;
    }

    // Will return first hit, email is not unique, only CustomerNumber is, this is best effort
    async getByEmail(email: string) {
        const allCustomers = await this.getAll('active') as FNCustomer[];
        return allCustomers.find((customer: FNCustomer) => customer.Email?.toLowerCase().includes(email.toLowerCase()));
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