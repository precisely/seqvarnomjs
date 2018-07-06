[![CircleCI](https://circleci.com/gh/precisely/seqvarnomjs.svg?style=shield&circle-token=fd58587005dd18a7f4aac2cf5ad0a530aa65d7e9)](https://circleci.com/gh/precisely/seqvarnomjs)

# SEQVARNOMJS

Javascript parser for [Sequence Variant Nomenclature](http://varnomen.hgvs.org/ ).


## Quick Start

Note: this is a private repo hosted on Github, so you need to:
```shell
yarn install git@github.com/precisely/seqvarnomjs
```

## Example
```javascript
var svn = require('seqvarnomjs');

var pattern = svn.parse('NC0001_1.11:g.111T>G');
var genotype = svn.parse('NC0001_1.11:g.[111T>G];[111=]');

svn.match(pattern, genotype); // => true
```

## Details

This library interprets SVN strings such as:

* simple variants `NC00001_1.11:g.111T>G`
* wild type `NC00001_1.11:g.111=`
* compound cis variants `NC0001_1.11:g.[111T>G;222A>G]`
   - 111T>G and 222A>G are on the same chromosome copy
* trans variants `NC0001_1.11:g.[111T>G];[222A>G]`
   - 111T>G and 222A>G are on different chromosome copies
* variants with uncertain phasing `NC0001_1.11:g.[111T>G](;)[222A>G]`
   - 111T>G and 222A>G may be on same chromosome copy or different ones
* complex variants `NC0001_1.11:g.[111T>G;222A>G];[333=](;)[444T>A];[555G>A]`

E.g.,

* match a variant:
  ```js
  const genotype = parse('NC0001_1.11:g.[111T>G]');
  const pattern = parse('NC0001_1.11:g.[111T>G]');
  genotype.matches(pattern); // => true
  ```
* match a part of a variant:
  ```js
  const genotype = parse('NC0001_1.11:g.[111T>G;222=](;)[333G>C;111=]');
  const pattern = parse('NC0001_1.11:g.[111T>G]');
  genotype.matches(pattern); // => true
  ```

