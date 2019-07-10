# fortnox
A Node.js module that implements, some, fortnox api functions.

## Installation 
```sh
npm install fortnox --save
yarn add fortnox
bower install fortnox --save
```
## Usage
### Javascript

import { Fortnox } from 'fortnox';
...
const fn = new Fortnox({host: 'https://api.fortnox.se/3/', clientSecret: 'xyz', accessToken: 'zyx' })
const aCustomer = await fn.customers.get('1');
const allCustomers = await fn.customers.get();
const aNewCustomer = await fn.customers.create({name: 'John McClane'});

## Implemented (so far):

* Customer (create, get, update, remove)
* Article (create, get, update, remove)
* Invoice (create, get, update, send, cancel)