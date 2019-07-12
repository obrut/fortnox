import { Articles } from './articles';
import { Customers } from './customers';
import { Invoices } from './invoices';
import { Dispatch } from './dispatch';

export class Fortnox {
    constructor(config: { host: string, clientSecret: string, accessToken: string }){
        const defaults = {
            json: true,
            headers: {
                'client-secret': config.clientSecret,
                'access-token': config.accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const dispatch = new Dispatch( {Host: config.host, Defaults: defaults } );
        this.articles = new Articles(dispatch);
        this.customers = new Customers(dispatch);
        this.invoices = new Invoices(dispatch);
    }

    public articles: Articles;
    public customers: Customers;
    public invoices: Invoices;
}