[![CircleCI](https://circleci.com/gh/precisely/seqvarnomjs.svg?style=shield&circle-token=fd58587005dd18a7f4aac2cf5ad0a530aa65d7e9)](https://circleci.com/gh/precisely/seqvarnomjs)

# SEQVARNOMJS

Javascript parser for [Sequence Variant Nomenclature](http://varnomen.hgvs.org/ ).

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

We add extensions to the existing standard which allows us to perform pattern matching using logic operators:

* OR operator `^`
* AND operator `&`
* GROUPING operator `{}`

E.g.,

* match either simple variant `111T>G` or `222A>G`
  `NC0001_1.11:g.[111T>G^222A>G]`
* match a simple variant on one chromosome or another
  `{NC0001_1.11:g.111T>G}^{NC0002_2.11:g.222T>G}`
* match a complex condition ((111 or 222) and (333 or 444))
  `NC0001_1.11:g.[{111T>G^222T>G}&{333>T>G^444T>G}]`

## API

WIP
```javascript
var svn = require('seqvarnomjs');

var pattern = svn.parse('NC0001_1.11:g.[111T>G^222A>G]');
var genotype = svn.parse('NC0001_1.11:g.111T>G');

svn.match(pattern, genotype); // => true
```
