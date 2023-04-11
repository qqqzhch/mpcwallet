<h1 align="center">Multichain - VaultUI</h1>

<p align="center">
  <a href="http://commitizen.github.io/cz-cli/">
	  <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitzen friendly" />
  </a>
  <a href="https://conventionalcommits.org">
	  <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" />
  </a>
</p>

## Getting started

This is a monorepo repository using [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/), [Commitzen](http://commitizen.github.io/cz-cli/) and [Conventional Commits](https://conventionalcommits.org) to maintain and manage component versions and for documentation, we use [tailwindcss](https://tailwindcss.com/)
and [cypress](https://www.cypress.io/).

## 💥 Features

- Create a Vault
- Send transaction
- Add assets
- Add a note to the address
- Contract interaction
- Support from test network ,BSC Test Net、Görli、Polygon Mumbai、FANTOM Test Net、AVALANCHE Fuji

## 🌐 Samples

#### demo
 https://vault-ui-web.vercel.app/



## ⚠️ Requirements

- Node > v18
- NPM > v8

_In order to use semantic release with github actions, you need to add a new secrets in your github repository. This is needed in order for Semantic Release to be able to publish a new release for the Github repository._

_[Create a token for Github](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). You need to give the token repo scope permissions._

_Check out this file: https://github.com/emunhoz/monorepo-boilerplate/blob/main/.github/workflows/release.yml#L32_

_You need to change this value with you new secrets: `GH_MONOREPO_TOKEN`_

## 🚀 Quick start

In the root folder run following commands _(all the below commands need to run on root folder)_:

Install all dependecies with:

```bash
  yarn
```

Run the front end application [`@monorepo-boilerplate/web`](./packages/web) and back end server application [`@monorepo-boilerplate/server`](./packages/server) :

```bash
  yarn start
```


## 🗂 Monorepo structure

| Package                                               | Description                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------- 
| [`@common/**`](./packages/commons)                    | Common functions, images, lints (eslint, stylelint, prettier) and other generics setup |
| [`@monorepo-boilerplate/ui-components`](./packages/ui-components) | React library components with [stories](https://storybook.js.org/)                     |
| [`@monorepo-boilerplate/web`](./packages/web)                    | Front end application create with vite app                                     |
| [`@monorepo-boilerplate/server`](./packages/server)                    | mock server data                                       |
| [`@monorepo-boilerplate/api`](./packages/api)                    | web3 rpc extend  for mpc server                                       |

## 🚨 Code standard

- [JavaScript Standard Style](https://standardjs.com/) - Javascript styleguide
- [Prettier](https://prettier.io/) - Code formatter
- [ESLint](https://eslint.org/) - Lint to quickly find problems


## ⌨️ Commands

| Command                 | Description                                                                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn`                  | Install all dependencies                                                                                                                                                                  |
| `yarn start`            | Run frontend/backend server                                                                                                                                                                          |
| `yarn test:ci`          | Run all tests                                                                                                                                                                             |
| `yarn e2e:open`        | open cypress                                                                                                |
| `yarn e2e:run`     | run cypress                                                                                                                                                              |                                                                            |
| `yarn build-app`        | Build of front app([`@monorepo-boilerplate/web`](./packages/web)) and generate a directory with all assets in the following path: `packages/web/build`                                                |


### yarn
If you encounter errors with Yarn, try
```
yarn policies set-version 1.19.0
```
