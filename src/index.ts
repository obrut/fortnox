import { Articles } from './articles';
import { Customers } from './customers';
import { Invoices } from './invoices';
import { SupplierInvoices } from './supplierinvoices'
import { Dispatch } from './dispatch';
import { Suppliers } from './suppliers';
import { Defaults } from './types/defaults';

export class Fortnox {
    constructor(){
        require('dotenv').config();
        const { FN_CLIENT_SECRET, FN_ACCESS_TOKEN, FN_HOST } = process.env;
        if (!FN_CLIENT_SECRET || !FN_ACCESS_TOKEN || !FN_HOST ){
            throw new Error("Missing Fortnox tokens in env, add FN_CLIENT_SECRET, FN_ACCESS_TOKEN, FN_HOST, get these from Fortnox.");
        }
        const defaults: Defaults = {
            json: true,
            headers: {
                'client-secret': FN_CLIENT_SECRET!,
                'access-token': FN_ACCESS_TOKEN!,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const dispatch = new Dispatch( {Host: FN_HOST!, Defaults: defaults } );
        this.articles = new Articles(dispatch);
        this.customers = new Customers(dispatch);
        this.invoices = new Invoices(dispatch);
        this.supplierInvoices = new SupplierInvoices(dispatch);
        this.suppliers = new Suppliers(dispatch);
    }

    public articles: Articles;
    public customers: Customers;
    public invoices: Invoices;
    public supplierInvoices: SupplierInvoices;
    public suppliers: Suppliers;
}