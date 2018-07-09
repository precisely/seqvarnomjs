
// We use Ullman subgraph isomorphism for detecting matches; this is a slight overkill,
// since we won't have cycles, but provides a guarantee of detecting every possible type
// of pattern reliably.
// We represent variants as labelled undirected complete graphs. To be specific, each node is
// a SimpleVariant and is connected with an edge labelled 'cis' or 'trans'.
// Labelled edges are represented as nodes in a graph with only labelled nodes.
// E.g.,
// [a;b;c] = 'a-cis-b', 'b-cis-c', 'a-cis-b' // note: there are 3 cis nodes
// [a;b];[c;d] = 'a-cis-b', 'c-cis-d','a-trans-c','a-trans-d','b-trans-c','b-trans-d' // 2 cis-nodes, 4 trans-nodes
// [a;b](;)[c;d] = 'a-cis-b', 'c-cis-d' // two disconnected subgraphs graphs with 2 cis nodes

import { zeros, range } from 'mathjs';
import { getIsomorphicSubgraphs } from 'subgraph-isomorphism';
import { matches } from './matcher';

export class VariantGraph {
  constructor(variants=[], relationship=null) {
    const varCount = variants.length;
    this.variantIndexes = range(0, varCount).toArray();
    if (relationship) {
      const relCount = relationship ? varCount * (varCount - 1) / 2 : 0;
      this.nodes = [...variants, ...new Array(relCount).fill(relationship)];
      this.matrix = zeros([this.nodes.length, this.nodes.length]);
      let relIndex = this.variantIndexes.length;
      withInternalPairs(this.variantIndexes, (i1, i2) => {
        addRelationship(this.matrix, i1, i2, relIndex++);
      });
    } else {
      this.matrix = zeros([varCount, varCount]);
      this.nodes = variants;
    }
  }

  indexOf(node) {
    return this.nodes.indexOf(node);
  }

  matches(pattern) {
    return getIsomorphicSubgraphs(this.adjacencyMatrix, pattern.adjacencyMatrix, 1, (p, g, pIndex, gIndex) => {
      const graphNode = this.nodes[gIndex];
      const patternNode = pattern.nodes[pIndex];
      const result = matches(graphNode, patternNode);
      return result;
    }).length > 0;
  }

  add(other, relationship=null) {
    const currentSize = this.nodes.length; // other nodes will follow this nodes
    const originalVariantIndexes = this.variantIndexes;
    const newVariantIndexes = other.variantIndexes.map(i => i +  currentSize);
    this.variantIndexes = [...this.variantIndexes, ...newVariantIndexes];

    if (relationship) {
      const newRelationshipCount = relationship ? originalVariantIndexes.length * newVariantIndexes.length : 0;
      let relationshipIndex = this.nodes.length + other.nodes.length;
      this.nodes = [...this.nodes, ...other.nodes, ...new Array(newRelationshipCount).fill(relationship)];

      this.matrix = appendMatrix(this.matrix, other.matrix, newRelationshipCount);

      withPairs(originalVariantIndexes, newVariantIndexes, (oIndex, nIndex) => {
        addRelationship(this.matrix, oIndex, nIndex, relationshipIndex++);
      });
    } else {
      this.matrix = appendMatrix(this.matrix, other.matrix);

      this.nodes = [...this.nodes, ...other.nodes];
    }
  }

  connectedIndexes(nodeIndex, depth=1) {
    const row = this.adjacencyMatrix[nodeIndex];
    const result = [];

    let index = -1;
    while ((index = row.indexOf(1, index + 1)) !== -1) {
      result.push(index);
    }
    depth--;
    if (depth === 0) {
      return result;
    } else {
      return result.reduce((r, i) => [...r, ...this.connectedIndexes(i, depth)], []);
    }
  }

  get adjacencyMatrix() {
    return this.matrix;
  }
}

//
// Helpers
//
function withInternalPairs(array, func) {
  for (var i = 0; i < array.length; i++) {
    for (var j = i+1; j < array.length; j++) {
      func(array[i], array[j]);
    }
  }
}

function withPairs(a1, a2, func) {
  for (var i = 0; i < a1.length; i++) {
    for (var j = 0; j < a2.length; j++) {
        func(a1[i], a2[j]);
    }
  }
}

function addRelationship(matrix, i1, i2, rIndex) {
  matrix[i1][rIndex] = 1;
  matrix[i2][rIndex] = 1;
  matrix[rIndex][i1] = 1;
  matrix[rIndex][i2] = 1;
}

/**
 * Extends matrix m1 with m2:
 * m1 is extended and m2 is in bottom right quadrant of new matrix
 * @param {*} m1
 * @param {*} m2
 */
function appendMatrix(m1, m2, zeroPadding=0) {
  const m1Len = m1.length;
  const m2Len = m2.length;
  m1.forEach((row, index) => {
    m1[index] = row.concat(zeroArray(m2Len + zeroPadding));
  });
  m2.forEach(row => {
    m1.push(zeroArray(m1Len).concat(row).concat(zeroArray(zeroPadding)));
  });
  const rowLength = m1Len + m2Len + zeroPadding;
  for (let i=0; i<zeroPadding; i++) {
    m1.push(zeroArray(rowLength));
  }
  return m1;
}

function zeroArray(len) {
  return new Array(len).fill(0);
}
