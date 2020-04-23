# combine-multiple-pdfs

[![npm](https://img.shields.io/npm/v/convert-array-to-csv.svg?style=flat-square)](https://www.npmjs.com/package/combine-multiple-pdfs)
[![master branch](https://img.shields.io/travis/aichbauer/node-convert-array-to-csv/master.svg?style=flat-square)](https://github.com/saijeevanballa/Merge-PDFs)
[![Codecov branch](https://img.shields.io/codecov/c/github/aichbauer/node-convert-array-to-csv/master.svg?style=flat-square)](https://github.com/saijeevanballa/Merge-PDFs/issues)

> Combine or Merge multiple Pdfs into single a Pdf

## Table of Contents

- [Why?](#why)
- [Installation](#installation)
- [Functions](#functions)
- [Usage](#usage)

## Why?

I needed a simple way to combine multiple pdf files into a single pdf file.

## Installation

```sh
$ npm i combine-multiple-pdfs -S
```

## Functions

Take a look into the [usage section](#usage) for a detailed example.

### combinePdfs

> Note: you can also use the default export.

This function Takes Array of file paths and converted into a sigle new buffer.

#### Syntax

Returns a new pdf file buffer.

```js
const newBuffer = combinePdfs(data, options);
```

##### Parameters

- data: an array of strings of files
- options: a object (optional)
  - holds two keys: outName and outPath
  - **outName**: output file name (optional parameter)
  - **outPath**: output file path (optional parameter) default: `data files path`

## Usage

An example how to use it.

```js
const { combinePdfs } = require("combine-multiple-pdfs");
/* or */
const combinePdfs = require("combine-multiple-pdfs");

let data = ["./dummy.pdf", "./dummy1.pdf"];
/* Minimum two files required */

let options = { outName: "mergedPdf", outPath: "./public" };

let newFileBuffer = combinePdfs(data, options);
```
