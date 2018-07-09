
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

import { sparse, range } from 'mathjs';

function withInternalPairs(array, func) {
  for (var i = 0; i < array.length; i++) {
    for (var j = i; j < array.length; j++) {
      if (i !== j) {
        func(array[i], array[j]);
      }
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
  matrix.set([i1, rIndex], 1);
  matrix.set([i2, rIndex], 1);
  matrix.set([rIndex, i1], 1);
  matrix.set([rIndex, i2], 1);
}

export class VariantGraph {
  constructor() {
    this.matrix = sparse();
    this.variantIndexes = [];
    this.nodes = [];
  }

  indexOf(node) {
    return this.nodes.indexOf(node);
  }

  // eslint-disable-next-line
  addVariants(newVariants, relationship) {
    this._adjacencyMatrix = null;
    const currentNodeCount = this.nodes.length;
    const currentVariantCount = this.variantIndexes.length;
    const newVariantCount = newVariants.length;
    const relationshipCountAmongstNewVariants = newVariantCount * (newVariantCount - 1) / 2; // connect all new to each other
    const relationshipCountBetweenNewAndCurrentVariants = currentVariantCount * newVariantCount; // connect each new node to each current node
    const newRelationshipCount = relationshipCountAmongstNewVariants + relationshipCountBetweenNewAndCurrentVariants;
    const newMatrixSize = currentNodeCount + newVariantCount + newRelationshipCount;
    const newVariantIndexes = range(currentNodeCount, currentNodeCount + newVariantCount).toArray();
    const currentVariantIndexes = this.variantIndexes;
    this.matrix.resize([newMatrixSize, newMatrixSize]);

    // relationship nodes start after the new nodes
    let newRelationshipIndex = this.nodes.length + newVariantCount;

    // connect all newVariants to each other:
    withInternalPairs(newVariantIndexes, (i1, i2) => {
      addRelationship(this.matrix, i1, i2, newRelationshipIndex);
      newRelationshipIndex++;
    });

    // connect each newVariant to each previous variant
    withPairs(newVariantIndexes, currentVariantIndexes, (i1, i2) => {
      addRelationship(this.matrix, i1, i2, newRelationshipIndex);
      newRelationshipIndex++;
    });

    this.nodes = [...this.nodes, ...newVariants, ... new Array(newRelationshipCount).fill(relationship)];
    this.variantIndexes = [...this.variantIndexes, ...newVariantIndexes];
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
    return this._adjacencyMatrix ||
          (this._adjacencyMatrix = this.matrix.toArray());
  }
}
