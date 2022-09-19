import http from 'http';
import fetch from 'node-fetch';
import config from './fnConfig.json';

/**
 * Simple server to get authorization code from Fortnox using OAuth2 (now it is the only supported method for the new apps)
 * This is to support TESTs (when you create a test account on fortnox)
 * To get the access token and run the tests:
 * - create a copy of fnConfig_sample.json => fnConfig.json
 * - register an app in fortnox, save the "client id" and "client secret", use http://localhost:3333/authorize as redirect url
 * - put client id and client secret to the fnConfig.json
 * - start the local server using: npm run auth
 * - navigate to http://localhost:3333 and click "authorize" link, this should redirect you to the authorization screen in fortnox
 * - go through the authorization process, at the end you should be redirected to http://localhost:3333/authorize
 * - on the screen you'll see the authorization code. copy it and paste in the fnConfig.json as "bearer token" value
 * - now you should be able to run the tests against that fortnox installation
 */

const host = 'localhost';
const port = 3333;
const scope = 'article customer price invoice supplier supplierinvoice';

const redirect_uri = `http://${host}:${port}/authorize`;

const fortnoxAuthReq = {
  client_id: config.clientId,
  redirect_uri,
  scope,
  state: `XXX`,
  access_type: `offline`,
  response_type: `code`
};

const authUrl = `https://apps.fortnox.se/oauth-v1/auth?${makeQueryString(fortnoxAuthReq)}`;

function makeQueryString (params: any) {
  return Object.keys(params)
    .map((key: string) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
}

async function authorize(url: string, params: any, headers?: any) {

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers
    },
    body: makeQueryString(params)
  });

  return await response.json();
}

const server = http.createServer((req, res) => {

  const url = new URL(`http://${host}:${port}${req.url}`);
  if (url.pathname === '/authorize') {
    const params = {
      code: url.searchParams.get('code'),
      grant_type: `authorization_code`,
      redirect_uri,
    }
    
    const credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
  
    authorize('https://apps.fortnox.se/oauth-v1/token', params, { 'Authorization': `Basic ${credentials}` }).then(json => {
      res.writeHead(200);
      res.end(json.access_token);
    });
  } else {
    res.writeHead(200);
    res.end(`<a href="${authUrl}">authorize</a>`)
  }
});

server.listen(port, host, () => {
  console.log(`server started on http://${host}:${port}`);
});
