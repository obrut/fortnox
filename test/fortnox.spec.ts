import { assert } from 'chai';
import { FNArticle } from '../src/types/FNArticle';
import { FNCustomer } from '../src/types/FNCustomer';
import { FNSupplierInvoice } from '../src/types/FNSupplierInvoice';
import { FNPrice } from '../src/types/FNPrice';
import { Fortnox } from './../src/index';

describe('fortnox', () => {
    //Add your own secret and token in ./fnconfig.json (ignored in .gitignore) sample-file included
    const config = require('./fnConfig.json');
    const fn = new Fortnox({ 
        host: 'https://api.fortnox.se/3/', 
        clientSecret: config.clientSecret, 
        accessToken: config.accessToken,
        bearerToken: config.bearerToken,
    });
    const time = new Date().valueOf();
    const aCustomer: FNCustomer = {
        Address1: 'Nakatomi Plaza',
        City: 'Los Angeles',
        Email: `test+${time}@myfortnox.com`,
        Name: 'John McClane',
        Phone1: '555 666 7777',
        ZipCode: 'CA 90067',
        CountryCode: 'US'
    };
    let newCustomerNumber: string;

    const anArticle: FNArticle = {
        Description: `Zippo Lighter ${time}`
    };
    let newArticleNumber: string;
    let newInvoiceNumber: string;
    const supplier = {
        Name: `Argyle Limo Ltd ${time}`,
        SupplierNumber: null
    };
    let newSupplierNumber: string = "0";
    const supplierInvoice: FNSupplierInvoice = {
        Currency: "SEK",
        CurrencyRate: "1",
        CurrencyUnit: 1,
        DueDate: "2030-01-01",
        InvoiceDate: "2020-02-19",
        SupplierInvoiceRows: [
        {
            Account: 2440,
            Code: "TOT",
            AccountDescription: "Leverantörsskulder",
            Debit: 0,
            Credit: 10000,
            Total: -10000
        },
        {
            Account: 2641,
            Code: "VAT",
            AccountDescription: "Debiterad ingående moms",
            Debit: 2000,
            Credit: 0,
            Total: 2000
        },
        {
            Account: 1240,
            Code: "PRE",
            AccountDescription: "Bilar och andra transportmedel",
            Debit: 8000,
            Credit: 0,
            Total: 8000
        }
        ],
        SupplierNumber: newSupplierNumber,
        Total: "10000",
        VAT: "2000",
        VATType: "NORMAL",
        SalesType: "STOCK"
      };
    let newGivenNumber: string = "0";

    it('should create an article', async () => {
        const response = await fn.articles.create(anArticle);
        newArticleNumber = response.ArticleNumber!;
        assert.isObject(response);
        assert.equal(response.Description, anArticle.Description)
    }),
    it('should return all active articles', async () => {
        const response = await fn.articles.getAll('active');
        assert.isArray(response);
    }),
    it('should return all articles', async () => {
        const response = await fn.articles.getAll();
        assert.isArray(response);
    }),
    it('should return an article', async () => {
        const response = await fn.articles.get(newArticleNumber);
        assert.equal(response.Description, anArticle.Description);
    }),


    it('should create a price', async () => {
        const response = await fn.prices.create({
            ArticleNumber: newArticleNumber,
            FromQuantity: 0,
            Price: 100,
            PriceList: 'A'
        });
        assert.isObject(response);
        assert.equal(response.Price, 100);
    });
    it('should create a volume price', async () => {
        const response = await fn.prices.create({
            ArticleNumber: newArticleNumber,
            FromQuantity: 100,
            Price: 90,
            PriceList: 'A'
        });
        assert.isObject(response);
        assert.equal(response.Price, 100);
    });
    it('should get all prices', async () => {
        const response = await fn.prices.getAll('A')
        console.log(response);
        assert.isArray(response);
    });
    it('should update a volume price', async () => {
        const response = await fn.prices.update({
            ArticleNumber: newArticleNumber,
            FromQuantity: 100,
            Price: 100500,
            PriceList: 'A'
        });
        assert.isObject(response);
        assert.equal(response.Price, 100500);
    })
    it('should remove a price', async () => {
        const response = await fn.prices.remove('A', newArticleNumber, 100);
        assert.isBoolean(response);
        assert.isTrue(response);
    })

    it('should create a customer', async () => {
        const response = await fn.customers.create(aCustomer);
        newCustomerNumber = response.CustomerNumber!;
        assert.isObject(response);
    }),
    it('should return active customers', async () => {
        const response = await fn.customers.getAll('active');
        assert.isArray(response);
    }),
    it('should return a customer by number', async () => {
        const response = await fn.customers.get(newCustomerNumber);
        assert.equal(response.Name, aCustomer.Name);
    }),
    it('should udpate a customer', async () => {
        const response = await fn.customers.update({ CustomerNumber: newCustomerNumber, Address2: 'Building 5' });
        assert.isObject(response);
        assert.equal(response.Address2, 'Building 5');
    }),
    it('should return a customer by email', async () => {
        const response = await fn.customers.getByEmail(aCustomer.Email!);
        assert.isObject(response);
        assert.equal(response!.Email, aCustomer!.Email);
    }),
    it('should return all customers', async () => {
        const response = await fn.customers.getAll();
        assert.isArray(response);
    }),
    it('should create an invoice', async () => {
        const articles: number = 10;
        const response = await fn.invoices.create( {
            CustomerNumber: newCustomerNumber,
            InvoiceRows: [{
                ArticleNumber: newArticleNumber,
                DeliveredQuantity: articles.toString(),
                Description: `Test ${time}`
            }],
            EmailInformation: {
                EmailAddressFrom: 'noreply@fortnox-wrapper.com',
                EmailAddressTo: aCustomer.Email,
                EmailBody: 'Invoice #{no} attached.',
                EmailSubject: 'Invoice attached'
            }
        });
        assert.equal(response.CustomerNumber, newCustomerNumber);
        assert.isObject(response);
        newInvoiceNumber = response.DocumentNumber!;
    }),
    it('should return an invoice', async () => {
        const response = await fn.invoices.get(newInvoiceNumber);
        assert.equal(response.CustomerNumber, newCustomerNumber);
    }),
    it('should return an invoice by customer', async () => {
        const response = await fn.invoices.getByCustomer(newCustomerNumber);
        assert.isArray(response);
    }),
    it('should return all unpaid invoices', async () => {
        const response = await fn.invoices.getAll('unpaid');
        assert.isArray(response);
    }),
    it ('should update an invoice', async () => {
        const result = await fn.invoices.update({ DocumentNumber: newInvoiceNumber, Freight: 100 });
        assert.isObject(result);
        assert.equal(result.Freight, 100);
    }),
    it('should send an invoice', async () => {
        const result = await fn.invoices.send(newInvoiceNumber);
        assert.isTrue(result.Sent);
    }),
    it('should cancel an invoice', async () => {
        const result = await fn.invoices.remove(newInvoiceNumber);
        assert.isTrue(result.Cancelled);
    }),
    it('should remove a customer', async () => {
        const result = await fn.customers.remove(newCustomerNumber);
        assert.isTrue(result);
    }),
    it('should remove or make article inactive', async () => {
        const result = await fn.articles.remove(newArticleNumber);
        assert.isTrue(result);
    }),
    it('should create a supplier and return a SupplierNumber', async () => {
        const result = await fn.suppliers.create(supplier);
        assert.isObject(result);
        newSupplierNumber = result.SupplierNumber!;
    }),
    it('should get a supplier', async () => {
        const result = await fn.suppliers.get(newSupplierNumber);
        assert.isObject(result);
        assert.equal(result.Name, supplier.Name);
    }),
    it('should update a supplier', async () => {
        const result = await fn.suppliers.update({SupplierNumber: newSupplierNumber, City: 'Los Angeles'});
        assert.isObject(result);
        assert.equal(result.City, 'Los Angeles');
    }),
    it ('should create a supplierinvoice', async () => {
        supplierInvoice.SupplierNumber = newSupplierNumber;
        const result = await fn.supplierInvoices.create(supplierInvoice);
        assert.isObject(result);
        newGivenNumber = result.GivenNumber!;
    }),
    it('should return an array of supplierinvoices', async () => {
        const result = await fn.supplierInvoices.get();
        assert.isArray(result);
    }),
    it('should return a supplierinvoice', async () => {
        const result = await fn.supplierInvoices.get(newGivenNumber) as FNSupplierInvoice;
        assert.isObject(result);
        assert.equal(result.GivenNumber, newGivenNumber);
        assert.isString(result.Total);
        assert.equal(Number.parseInt(result!.Total!), 10000);
    }),
    it('should return an array of one supplierinvoices', async () => {
        const result = await fn.supplierInvoices.getSpecified([newGivenNumber]);
        assert.isArray(result);
        assert.lengthOf(result, 1);
    })
    it('should cancel a supplierinvoice', async () => {
        const result = await fn.supplierInvoices.remove(newGivenNumber);
        assert.isBoolean(result);
        assert.isTrue(result);
    }),
    it('should inactivate a supplier', async () => {
        const result = await fn.suppliers.remove(newSupplierNumber);
        assert.isBoolean(result);
        assert.isTrue(result);
    })

})