import { Articles } from './articles';
import { Customers } from './customers';
import { Invoices } from './invoices';

export class Fortnox {
    defaults: any;
    host: string;

    constructor(config: { host: string, clientSecret: string, accessToken: string }){
        this.host = config.host;
        this.defaults = {
            json: true,
            headers: {
                'client-secret': config.clientSecret,
                'access-token': config.accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    }

    public articles: Articles = new Articles(this);
    public customers: Customers = new Customers(this);
    public invoices: Invoices = new Invoices(this);
}