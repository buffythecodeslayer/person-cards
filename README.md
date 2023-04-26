
# Development

The person-cards app runs on two major components: `swapi-graphql` and `person-explorer`.

`swapi-graphql` is a GraphQL server that exposes a GraphQL endpoint for accessing data
related to Star Wars characters. The data is formatted to be used exclusively with person-explorer.

`person-explorer` is a web application built using the Next.js framework. It uses React for the frontend and queries data from the Star Wars API GraphQL endpoint (swapi-graphql) to display information about characters from the Star Wars universe. The application is hosted on a Next.js server and can be accessed through a web browser.

## 0. Requirements

This install was tested using `npm v9.5.1` and `node v18.16.0`.

## 1. Clone the repo

```bash
$ git clone https://github.com/buffythecodeslayer/person-cards.git
$ cd person-cards
```

## 2. Run swapi-graphql

```bash
$ cd swapi-graphql
$ npm i
$ npm run start

> server@1.0.0 start
> node ./src/server.js

🚀  Server ready at: http://localhost:4000/
```

### Verify before moving forward

At this point, if you navigate to http://localhost:4000/ in your browser, you should see
an interface allowing you to run queries against the server.

## 3. Run person-explorer

Open a new terminal. Assuming we are still in the `/swapi-graphql` directory,

```bash
$ cd ../person-explorer
$ npm i 
$ npm run dev

> person-explorer@1.0.0 dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Disabled SWC as replacement for Babel because of custom Babel configuration ".babelrc" https://nextjs.org/docs/messages/swc-disabled
event - compiled client and server successfully in 587 ms (183 modules)

```

### Verify

At this point, navigating to http://localhost:3000 in your browser, you should see
the `person-explorer` app!
