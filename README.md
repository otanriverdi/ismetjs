[![ismetjs](https://raw.githubusercontent.com/otanriverdi/ismetjs/master/assets/banner.png)](https://github.com/otanriverdi/ismetjs)

<p align="center">
  <a href="https://npmjs.org/package/ismetjs">
    <img src="https://img.shields.io/npm/v/ismetjs" alt="version">
  </a>
  <a href="https://travis-ci.org/otanriverdi/ismetjs">
    <img src="https://travis-ci.com/otanriverdi/ismetjs.svg?branch=master" alt="travis">
  </a>
  <a href="https://codecov.io/gh/otanriverdi/ismetjs">
    <img src="https://codecov.io/gh/otanriverdi/ismetjs/branch/master/graph/badge.svg" />
  </a>
  <a href="https://github.com/otanriverdi/ismetjs">
    <img src="https://img.shields.io/github/license/otanriverdi/ismetjs" alt="license">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="commitizen">
  </a>
</p>

<br>
<p align="center"><b>>_ A CLI tool to automatically generate and manage git repository issues from TODO/FIXME comments.</b></p>

## Overview

```javascript
// TODO I'm going to become a Github issue!
console.log('Hello, World!');
```

`ismet` is a project management tool for small to medium sized teams. It combines the ease of use of TODO comments with the practicality of Github issues.

It creates and deletes Github issues by parsing your project for TODO/FIXME comments. TODO comments can be used as usual and `ismet` will handle the rest. Deleted comments will be removed from issues and duplicated comments will be stacked into a single issue automatically. No manual work needed!

## Quick Start

Install `ismet` to your project:

```sh
npm install -save-dev ismetjs
```

Install [husky](https://github.com/typicode/husky/tree/master) to manage your git hooks:

```sh
npm install --save-dev husky
```

Add `ismet` to your `package.json` scripts:

```
"ismet": "ismet"
```

Add `ismet` to your post-commit hook inside the `package.json`:

```json
// package.json
{
  "husky": {
    "hooks": {
      "post-commit": "npm run ismet",
    }
  }
}
```

**Now, use TODO/FIXME comments as you normally would and `ismet` will do the rest!**

## Installation

### Install globally

```sh
npm install -g ismetjs
```

Verify your installation:

```sh
ismet --version
```

### Install locally

```sh
npm install -D ismetjs
```

Add the script to your `package.json`:

```
"ismet": "ismet <directory>"
```

## Project Setup

**It is recommended to run Ismet either in a post-commit hook or in CI.**

### Configuring for CI

Running `ismet` in CI requires a Github personal access token to be set as an environment variable called `GITHUB_TOKEN`. More information on how to create a personal access token can be found [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

**Your personal access token needs to have `repo` access.**

With that, you can add the `ismet <directory>` command anywhere in your CI setup.

### Configuring to run in a post-commit hook

You can use a library like [husky](https://github.com/typicode/husky) to run `ismet` automatically post-commit. It is recommended to run it post-commit to have the latest updated code as the source.

You can use the command `ismet <directory>` in your git hooks setup.

## Usage

To see all available commands:

```sh
ismet --help
```

### Allowing access

`ismet` will start the login sequence using the Github OAuth API first time the command is run. Your token will be saved for later use.

If you don't want to login, you can use the `GITHUB_TOKEN` environment variable. See the **Configuring for CI** section to find out how to get a token.

### Listing all comments

You can use the list functionality to find the locations of comments to work on or if you want to see issues that will be created before submitting them on Github:

```sh
ismet --list
ismet -l
```

### Issue generation

Add `TODO` or `FIXME` commands to your code.

```javascript
// TODO this is an ismet comment

/* FIXME so is this */
```

To run `ismet` and create your issues. By default, `node_modules` and everything inside `.gitignore` is ignored automatically:

```sh
ismet <directory>
```

### Logging out

To log out from `ismet` and delete your access token:

```sh
ismet --logout
```
