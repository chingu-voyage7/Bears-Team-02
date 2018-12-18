# The Source 👩‍💻

The Source is a tutorial search service powered by crowd-sourced ratings and reviews.

---

## Team

|                                            [**Leen Kim**](https://github.com/llcoolk)                                             |                              [**Benjamin Brooke**](https://github.com/benjaminadk)                              |                                [**Eric Miller**](https://github.com/ericmiller777)                                |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
|            [<img src="https://avatars3.githubusercontent.com/u/37844353?s=80" width="80">](https://github.com/llcoolk)            | [<img src="https://avatars2.githubusercontent.com/u/28043421?s=80" width="80">](https://github.com/benjaminadk) | [<img src="https://avatars3.githubusercontent.com/u/29766054?s=80" width="80">](https://github.com/ericmiller777) |
|                    [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/llcoolk)                     |         [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/benjaminadk)          |         [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ericmiller777)          |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/leen-kim/) |                                                                                                                 |                                                                                                                   |

---

## Contents

- [The Source 👩‍💻](#the-source-%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB)
  - [Team](#team)
  - [Contents](#contents)
  - [Scripts](#scripts)
  - [Environment Variables](#environment-variables)
  - [Tech Stack](#tech-stack)
    - [Backend Dependencies (production)](#backend-dependencies-production)
    - [Backend Dependencies (development)](#backend-dependencies-development)
    - [Frontend Dependencies (production)](#frontend-dependencies-production)
    - [Frontend Dependencies (development)](#frontend-dependencies-development)

## Scripts

```bash
npm run dev
```

Starts the React app in **development** mode at `http://localhost:8282`

- supports hot code reloading
- automatic transpilation and bundling
- server rendering and indexing of `./pages`

```bash
npm build
npm start
```

`npm build` builds a production ready version of the React app. `npm start` will start the built app.

```bash
npm test
```

Starts the Jest / Enzyme testing suite

## Environment Variables

| Key                     | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `BACKEND_DEV`           | Backend host and port in development - `http://localhost:7272` |
| `COOKIE`                | Name of cookie containing JWT                                  |
| `DEBUG`                 | Toggle extra Apollo Server console logs                        |
| `FRONTEND_DEV`          | Frontend host and port in development                          |
| `GOOGLE_ID`             | Client ID Google Plus OAuth                                    |
| `GOOGLE_SECRET`         | Client Secret Google Plus OAuth                                |
| `JWT_SECRET`            | Used in creation of Json Web Token                             |
| `PRISMA_ENDPOINT`       | Prisma database url                                            |
| `PRISMA_SERVICE_SECRET` | Required to access Prisma database                             |
| `PRISMA_TOKEN`          | Sent with seed request to Prisma                               |
| `PORT`                  | Backend Server port                                            |

## Tech Stack

### Backend Dependencies (production)

| Pkgs                      | Use | Description                                              | Link                                                            |
| ------------------------- | --- | -------------------------------------------------------- | --------------------------------------------------------------- |
| `apollo-server-express`   |     | A GraphQL Server for Express                             | [docs](https://www.apollographql.com/docs/apollo-server/)       |
| `axios`                   |     | Promise based HTTP client for the browser and JavaScript | [github](https://github.com/axios/axios)                        |
| `bcryptjs`                |     | Library to help hash passwords                           | [github](https://github.com/dcodeIO/bcrypt.js)                  |
| `cookie-parser`           |     | Parse `Cookie` header and populate `req.cookies`         | [github](https://github.com/expressjs/cookie-parser)            |
| `csv-parse`               |     | Parser to convert CSV text into arrays or objects        | [docs](https://csv.js.org/parse/)                               |
| `dotenv`                  |     | Loads variables from `.env` files into `process.env`     | [github](https://github.com/motdotla/dotenv)                    |
| `express`                 |     | Web framework for Node.js                                | [docs](https://expressjs.com/)                                  |
| `graphql-import`          |     | Converts `.graphql` file into typeDef string             | [docs](https://oss.prisma.io/content/graphql-import/overview)   |
| `graphql-resolvers`       |     | Resolver composition library                             | [github](https://github.com/lucasconstantino/graphql-resolvers) |
| `jsonwebtoken`            |     | An implementation of JSON Web Tokens                     | [github](https://github.com/auth0/node-jsonwebtoken)            |
| `nodemon`                 |     | Monitors changes and reloads node automatically          | [docs](https://nodemon.io/)                                     |
| `passport`                |     | Simple, unobtrusive authentication for Node.js           | [docs](http://www.passportjs.org/)                              |
| `passport-google-oauth20` |     | Google authentication for Passport                       | [github](https://github.com/jaredhanson/passport-google-oauth2) |
| `prisma-client-lib`       |     | Everything needed to run Prisma Client with JavaScript   | [docs](https://www.prisma.io/client/client-javascript)          |

### Backend Dependencies (development)

| Pkgs | Use | Description | Link |
| ---- | --- | ----------- | ---- |
| ⚠️   |     |             |      |

### Frontend Dependencies (production)

| Pkgs               | Use         | Description                                                                          | Link                                                            |
| ------------------ | ----------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `next`             | development | Framework for server-side rendered React apps                                        | [docs](https://nextjs.org/learn)                                |
| `react`            | development | JavaScript library for building user interfaces                                      | [docs](https://reactjs.org/)                                    |
| `react-dom`        | development | React package for working with the DOM                                               | [github](https://github.com/facebook/react)                     |
| `apollo-boost`     | state mgmt  | Zero-config Apollo Client                                                            | [github](https://github.com/apollographql/apollo-client#readme) |
| `next-with-apollo` | development | Apollo HOC for Next.js                                                               | [github](https://github.com/lfades/next-with-apollo#readme)     |
| `react-apollo`     | state mgmt  | React data container for Apollo Client                                               | [github](https://github.com/apollographql/react-apollo#readme)  |
| `graphql`          | development | JS ref implementation of GraphQL (requirement for `apollo-boost` and `react-apollo`) | [github](https://github.com/graphql/graphql-js)                 |
| `graphql-tag`      | development | JS template literal tag that parses GraphQL queries                                  | [github](https://github.com/apollographql/graphql-tag#readme)   |
| `@zeit/next-sass`  | styling     | Compiles `.scss` files to `.css` files                                               | [github](https://github.com/zeit/next-plugins#readme)           |
| `@zeit/next-css`   | styling     | Required for importing fonts and other assets in `.scss` files                       | [github](https://github.com/zeit/next-plugins#readme)           |
| `node-sass`        | styling     | Nodejs bindings for `LibSass`                                                        | [github](https://github.com/sass/node-sass)                     |
| `nprogress`        | UI          | Progress bar for loading components                                                  | [github](https://github.com/rstacruz/nprogress)                 |

### Frontend Dependencies (development)

| Pkgs                        | Use         | Description                                                 | Link                                                                  |
| --------------------------- | ----------- | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| `jest`                      | testing     | JavaScript Testing                                          | [docs](https://jestjs.io/)                                            |
| `babel-jest`                | testing     | Jest plugin to use babel for transformation                 | [github](https://github.com/facebook/jest#readme)                     |
| `enzyme`                    | testing     | JavaScript Testing utilities for React                      | [docs](https://airbnb.io/enzyme/)                                     |
| `enzyme-adapter-react-16`   | testing     | Enzyme adapter for React                                    | [docs](https://airbnb.io/enzyme/)                                     |
| `eslint`                    | linter      | An AST-based pattern checker for JavaScript                 | [docs](https://eslint.org/)                                           |
| `eslint-plugin-jest`        | linter      | ESLint rules for Jest                                       | [github](https://github.com/jest-community/eslint-plugin-jest#readme) |
| `eslint-plugin-prettier`    | linter      | Runs prettier as an eslint rule                             | [github](https://github.com/prettier/eslint-plugin-prettier#readme)   |
| `eslint-config-airbnb-base` | linter      | Airbnb's ESLint config                                      | [github](https://github.com/airbnb/javascript)                        |
| `eslint-plugin-import`      | linter      | Supports linting of ES6 import/export syntax                | [github](https://github.com/benmosher/eslint-plugin-import)           |
| `eslint-plugin-jsx-a11y`    | linter      | Static AST checker for accessibility rules on JSX elements  | [github](https://github.com/evcohen/eslint-plugin-jsx-a11y#readme)    |
| `eslint-plugin-react`       | linter      | React specific linting rules for ESLin                      | [github](https://github.com/yannickcr/eslint-plugin-react)            |
| `babel-eslint`              | linter      | Custom parser for ESLint                                    | [github](https://github.com/babel/babel-eslint)                       |
| `husky`                     | development | Pre-`git commit` linting hooks                              | [docs](https://github.com/typicode/husky/blob/master/DOCS.md)         |
| `lint-staged`               | development | Lint files staged by git                                    | [github](https://github.com/okonet/lint-staged#readme)                |
| `prettier`                  | development | Opinionated code formatter                                  | [docs](https://prettier.io/)                                          |
| `file-loader`               | bundling    | A file loader module for webpack                            | [github](https://github.com/webpack-contrib/file-loader)              |
| `url-loader`                | bundling    | A loader for webpack which transforms files into base64 URI | [github](https://github.com/webpack-contrib/url-loader)               |

---

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

[↑](#the-source) 👋
