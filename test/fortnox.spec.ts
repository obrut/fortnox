import { assert, expect } from 'chai';
import { Fortnox } from './../src/index';

describe('fortnox', () => {
    //Add your own secret and token.
    const fn = new Fortnox({ host: 'https://api.fortnox.se/3/', clientSecret: 'xyz', accessToken: 'zyx' });
    const aCustomer = {
        Address1: 'Nakatomi Plaza',
        City: 'Los Angeles',
        Email: 'holly.gennaro@nakatomi.jp',
        Name: 'John McClane',
        Phone1: '555 666 7777',
        ZipCode: 'CA 90067',
        CountryCode: 'US'
    };
    let newCustomerNumber: string;

    const anArticle = {
        Description: 'Zippo Lighter'
    };
    let newArticleNumber: string;

    let newInvoiceNumber: string;

    it('should create an article', async () => {
        const response = await fn.articles.create(anArticle);
        newArticleNumber = response.Article.ArticleNumber;
        assert.isObject(response.Article);
    }),
    it('should return all articles', async () => {
        const response = await fn.articles.get();
        assert.isArray(response.Articles);
    }),
    it('should return an article', async () => {
        const response = await fn.articles.get(newArticleNumber);
        assert.equal(response.Article.Description, anArticle.Description);
    }),
    it('should create a customer', async () => {
        const response = await fn.customers.create(aCustomer);
        newCustomerNumber = response.Customer.CustomerNumber;
        assert.isObject(response.Customer);
    }),
    it('should return a customer', async () => {
        const response = await fn.customers.get(newCustomerNumber);
        assert.equal(response.Customer.Name, aCustomer.Name);
    }),
    it('should return all customers', async () => {
        const response = await fn.customers.get();
        assert.isArray(response.Customers);
    }),
    //Commented because issuing an invoice locks customers/articles and leaves residue in the test environment.
    //Tests should be working however, just uncomment and deal with the residue.
    // it('should create an invoice', async () => {
    //     const articles: number = 10;
    //     const response = await fn.invoices.create( {
    //         CustomerNumber: newCustomerNumber,
    //         InvoiceRows: [{
    //             ArticleNumber: newArticleNumber,
    //             DeliveredQuantity: articles
    //         }]
    //     });
    //     assert.equal(response.Invoice.CustomerNumber, newCustomerNumber);
    //     assert.isObject(response.Invoice);
    //     newInvoiceNumber = response.Invoice.DocumentNumber;
    // }),
    // it('should return an invoice', async () => {
    //     const response = await fn.invoices.get(newInvoiceNumber);
    //     assert.equal(response.Invoice.CustomerNumber, newCustomerNumber);
    // }),
    // it('should cancel an invoice', async () => {
    //     const result = await fn.invoices.remove(newInvoiceNumber);
    //     assert.isUndefined(result);
    // }),
    it('should remove a customer', async () => {
        const result = await fn.customers.remove(newCustomerNumber);
        assert.isUndefined(result);
    }),
    it('should remove an article', async () => {
        const result = await fn.articles.remove(newArticleNumber);
        assert.isUndefined(result);
    })
})