import { assert, expect } from 'chai';
import { Fortnox } from './../src/index';

describe('fortnox', () => {
    //Add your own secret and token.
    const fn = new Fortnox({ host: 'https://api.fortnox.se/3/', clientSecret: 'xyz', accessToken: 'zyx' });
    const time = new Date().valueOf();
    const aCustomer = {
        Address1: 'Nakatomi Plaza',
        City: 'Los Angeles',
        Email: `test+${time}@myfortnox.com`,
        Name: 'John McClane',
        Phone1: '555 666 7777',
        ZipCode: 'CA 90067',
        CountryCode: 'US'
    };
    let newCustomerNumber: string;

    const anArticle = {
        Description: `Zippo Lighter ${time}`
    };
    let newArticleNumber: string;

    let newInvoiceNumber: string;

    it('should create an article', async () => {
        const response = await fn.articles.create(anArticle);
        newArticleNumber = response.ArticleNumber;
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
    it('should create a customer', async () => {
        const response = await fn.customers.create(aCustomer);
        newCustomerNumber = response.CustomerNumber;
        assert.isObject(response);
    }),
    it('should return active customers', async () => {
        const response = await fn.customers.getAll('active');
        assert.isArray(response);
    }),
    it('should return a customer', async () => {
        const response = await fn.customers.get(newCustomerNumber);
        assert.equal(response.Name, aCustomer.Name);
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
                DeliveredQuantity: articles,
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
        newInvoiceNumber = response.DocumentNumber;
    }),
    it('should return an invoice', async () => {
        const response = await fn.invoices.get(newInvoiceNumber);
        assert.equal(response.CustomerNumber, newCustomerNumber);
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
    })
})