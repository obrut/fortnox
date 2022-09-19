import { Articles } from './articles';
import { Customers } from './customers';
import { Invoices } from './invoices';
import { Prices } from './prices';
import { SupplierInvoices } from './supplierinvoices'
import { Dispatch } from './dispatch';
import { Suppliers } from './suppliers';
import { Defaults } from './types/defaults';

export class Fortnox {
    constructor(config: {
        host: string,
        bearerToken?: string,
        clientSecret?: string,
        accessToken?: string,
    }) {
        const defaults: Defaults = {
            json: true,
            headers: {
                ...(config.bearerToken && { 'Authorization': `Bearer ${config.bearerToken}` }),
                ...(config.clientSecret && { 'client-secret': config.clientSecret }),
                ...(config.accessToken && { 'access-token': config.accessToken }),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const dispatch = new Dispatch({ Host: config.host, Defaults: defaults });
        this.articles = new Articles(dispatch);
        this.customers = new Customers(dispatch);
        this.invoices = new Invoices(dispatch);
        this.supplierInvoices = new SupplierInvoices(dispatch);
        this.suppliers = new Suppliers(dispatch);
        this.prices = new Prices(dispatch);
    }

    public articles: Articles;
    public customers: Customers;
    public invoices: Invoices;
    public supplierInvoices: SupplierInvoices;
    public suppliers: Suppliers;
    public prices: Prices;
}