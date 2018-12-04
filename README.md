# The Source 👩‍💻

The Source is a tutorial search service powered by crowd-sourced ratings and reviews.

***

## Team
| [**Frank Faustino**](https://github.com/frankfaustino) | [**Leen Kim**](https://github.com/llcoolk) | [**Benjamin Cook**](https://github.com/benjaminadk) | [**Eric Miller**](https://github.com/ericmiller777) |
|:----------------:|:----------------:|:----------------:|:----------------:|
| [<img src="https://avatars1.githubusercontent.com/u/2607929?s=80" width="80">](https://github.com/frankfaustino) | [<img src="https://avatars3.githubusercontent.com/u/37844353?s=80" width="80">](https://github.com/llcoolk) | [<img src="https://avatars2.githubusercontent.com/u/28043421?s=80" width="80">](https://github.com/benjaminadk) | [<img src="https://avatars3.githubusercontent.com/u/29766054?s=80" width="80">](https://github.com/ericmiller777) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/frankfaustino) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/llcoolk) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/benjaminadk) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ericmiller777) |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/frankfaustino/) ||||

***

## Contents

 - [Scripts](#scripts)
 - [Environment Variables](#environment-variables)
 - [Tech Stack](#tech-stack)
    - [Backend Dependencies (production)](#backend-dependencies-production)
    - [Backend Dependencies (development)](#backend-dependencies-development)
    - [Frontend Dependencies (production)](#frontend-dependencies-production)
    - [Frontend Dependencies (development)](#frontend-dependencies-development)
 - API Documentation

## Scripts
```bash
npm run dev
```
Starts the React app in __development__ mode at `http://localhost:8282`\
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

| Key | Description |
|-----|-------------|
|⚠️||

## Tech Stack

### Backend Dependencies (production)

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`prisma-client-lib`||||
|`graphql-yoga`||||
|`dotenv`||||
|`nodemon`||||

### Backend Dependencies (development)

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|⚠️||||

### Frontend Dependencies (production)

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`next`|development|Framework for server-side rendered React apps|[docs](https://nextjs.org/learn)|
|`react`|development|JavaScript library for building user interfaces|[docs](https://reactjs.org/)|
|`react-dom`|development|React package for working with the DOM|[github](https://github.com/facebook/react)|

### Frontend Dependencies (development)

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`jest`|testing|JavaScript Testing|[docs](https://jestjs.io/)|
|`babel-jest`|testing|Jest plugin to use babel for transformation|[github](https://github.com/facebook/jest#readme)|
|`enzyme`|testing|JavaScript Testing utilities for React|[docs](https://airbnb.io/enzyme/)|
|`enzyme-adapter-react-16`|testing|Enzyme adapter for React|[docs](https://airbnb.io/enzyme/)|
|`eslint`|linter|An AST-based pattern checker for JavaScript|[docs](https://eslint.org/)|
|`eslint-plugin-jest`|linter|ESLint rules for Jest|[github](https://github.com/jest-community/eslint-plugin-jest#readme)|
|`eslint-plugin-prettier`|linter|Runs prettier as an eslint rule|[github](https://github.com/prettier/eslint-plugin-prettier#readme)|
|`eslint-config-airbnb-base`|linter|Airbnb's ESLint config|[github](https://github.com/airbnb/javascript)|
|`eslint-plugin-import`|linter|Supports linting of ES6 import/export syntax|[github](https://github.com/benmosher/eslint-plugin-import)|
|`eslint-plugin-jsx-a11y`|linter|Static AST checker for accessibility rules on JSX elements|[github](https://github.com/evcohen/eslint-plugin-jsx-a11y#readme)|
|`eslint-plugin-react`|linter|React specific linting rules for ESLin|[github](https://github.com/yannickcr/eslint-plugin-react)|
|`babel-eslint`|linter|Custom parser for ESLint|[github](https://github.com/babel/babel-eslint)|
|`husky`|development|Pre-`git commit` linting hooks|[docs](https://github.com/typicode/husky/blob/master/DOCS.md)|
|`lint-staged`|development|Lint files staged by git|[github](https://github.com/okonet/lint-staged#readme)|
|`prettier`|development|Opinionated code formatter|[docs](https://prettier.io/)|

***

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

[↑](#the-source) 👋