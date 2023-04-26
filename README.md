
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
![image](https://user-images.githubusercontent.com/131392424/234639158-65d8aff6-0bea-457c-9038-803490710237.png)

# Implementation

The implementation was split into three major phases. GraphQL Server, Functional UI, and Full UI. The [PR's](https://github.com/buffythecodeslayer/person-cards/pulls?q=is%3Apr+is%3Aclosed) are split to reflect this.

- **GraphQL Server**
    - https://github.com/buffythecodeslayer/person-cards/pull/1 Setup working boilerplate
    - https://github.com/buffythecodeslayer/person-cards/pull/3 Change folder name
    - https://github.com/buffythecodeslayer/person-cards/pull/4 Delete unused folder
    - https://github.com/buffythecodeslayer/person-cards/pull/5 Fetch homeworld
- **Functional UI**
    - https://github.com/buffythecodeslayer/person-cards/pull/2 Initial functional requirements
    - https://github.com/buffythecodeslayer/person-cards/pull/6 Read origin property
- **Full UI**
    - https://github.com/buffythecodeslayer/person-cards/pull/7 Add styling
    
## Decoupled
Although they are in the same repo, `swapi-graphql` and `person-explorer` are decoupled and can be migrated to separate repo's.
The PR's also intentionally do not overlap.

