# fortnox
A Node.js module that implements, some, fortnox api functions.

## Installation 
```sh
npm install fortnox --save
```
## Usage

### Configuration
Add to env:
FN_CLIENT_SECRET
FN_ACCESS_TOKEN
FN_HOST

Get these from Fortnox

### Javascript

```js
import { Fortnox } from 'fortnox';

const fn = new Fortnox()
const aCustomer = await fn.customers.get('1');
const allActiveCustomers = await fn.customers.getAll('active'); 
const aNewCustomer = await fn.customers.create({Name: 'John McClane'});
```

## Implemented (so far):

* Customer (create, get, update, remove)
* Article (create, get, update, remove)
* Invoice (create, get, update, send (email), cancel)
* Supplier (create, get, update, inactivate)
* SupplierInvoice (create, get, update, cancel)

Fork and add stuff!

## Help
* Documentation for Fortnox at https://developer.fortnox.se/documentation/