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
<p align="center"><b>>_ A CLI tool to automatically generate and manage git repo issues from code comments.</b></p>

## Installation

```sh
npm install -g ismetjs
```

Verify your installation:

```sh
ismet --version
```

## Usage

To see all available commands:

```sh
ismet --help
```

**Currently, `ismet` only supports JavaScript files.**

Create comments on your code using the `$(ismet)` directive.

```javascript
// $(ismet) this is an ismet comment

/* $(ismet) so is this */

/**
 * You can also place the directive anywhere $(ismet)
 */
```

**Currently, `ismet` only supports Github remotes.**

To run `ismet` and create your issues:

```sh
ismet <directory>
```

### Running pre-commit

Running `ismet` pre-commit using a library like [husky](https://github.com/typicode/husky) is recommended.

### Dry run

If you want to see issues to be created before submitting them on Github:

```sh
ismet --dry-run
```

### Logging out

If you want to log out from `ismet`:

```sh
ismet --logout
```