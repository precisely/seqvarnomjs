import { matches } from './matcher';
import { zeros } from 'mathjs'; // required by subgraph-isomorphism
import { VariantGraph } from './variant-graph';

export class SequenceVariant {
  constructor({ ac, type, variant }) {
    this.ac = ac;
    this.type = type;
    this.variant = variant;
  }

  toString() {
    return `${this.ac.toString()}:${this.type}.${this.variant.toString()}`;
  }

  toGraph() {
    return this.variant.toGraph();
  }

  matches(pattern) {
    if (this.ac === pattern.ac && this.type === pattern.type) {
      const vGraph = this.toGraph();
      const pGraph = pattern.toGraph();
      return vGraph.matches(pGraph);
    }
    return false;
  }
}

export class RelativeVariant {
}

export class UnphasedVariant extends RelativeVariant {
  constructor({ variants }) {
    super();
    this.variants = variants;
  }

  get type() {
    return 'unphased';
  }

  toString() {
    return this.variants.map(v => v.toString()).join('(;)');
  }

  toGraph() {
    // unphased variant adds patterns without specifying their connectivity
    const graph = new VariantGraph([]);
    for (const variant of this.variants) {
      graph.add(variant.toGraph(), null); // disconnected subgraphs
    }
    return graph;
  }
}

export class TransVariant extends RelativeVariant {
  constructor({ variants }) {
    super();
    this.variants = variants;
  }

  get type() {
    return 'trans';
  }

  toString() {
    return this.variants.map(v=>v.toString()).join(';');
  }

  toGraph() {
    // unphased variant adds patterns without specifying their connectivity
    const graph = new VariantGraph([]);
    for (const variant of this.variants) {
      graph.add(variant.toGraph(), 'trans'); // disconnected subgraphs
    }
    return graph;
  }
}

export class CisVariant extends RelativeVariant { // aka Allele
  constructor({ variants }) {
    super();
    this.variants = variants;
  }

  get type() {
    return 'cis';
  }

  toString() {
    return '[' + this.variants.map(v=>v.toString()).join(';') + ']';
  }

  toGraph() {
    // unphased variant adds patterns without specifying their connectivity
    return new VariantGraph(this.variants, 'cis');
  }
}

export class SimpleVariant {
  constructor({ pos, edit, uncertain }) {
    this.pos = pos;
    this.edit = edit;
    this.uncertain = uncertain || false;
  }

  get type() {
    return 'simple';
  }

  toString() {
    const edit = this.edit || '=';
    const pos = this.pos || 'error';
    return `${pos.toString()}${edit.toString()}`;
  }

  toGraph() {
    return new VariantGraph([this]);
  }

  matches(pattern) {
    return (
      pattern instanceof SimpleVariant
      && matches(this.pos, pattern.pos)
      && matches(this.edit, pattern.edit)
      && matches(this.uncertain, pattern.uncertain)
    );
  }
}

// var depth = 0;
// /**
//  * If variant and patternVariant are the same class:
//  */
// export function matchesSameClassVariant(patternVariant, variant) {
//   console.log(`${'\t'.repeat(depth)}attempting to match %s to pattern %s`, variant.toString(), patternVariant.toString());
//   depth++;
//   const indent = '\t'.repeat(depth);

//   if (!patternVariant.variants) { // either pattern has no variants to check
//     return true;
//   } else {
//     const variants = [...variant.variants];
//     for (const pv of patternVariant.variants) {
//       console.log('%schecking pattern subvariant %s', indent, pv.toString());
//       const index = variants.findIndex(v => v.matches(pv));
//       if (index === -1) {
//         console.log('%sfailed', indent);
//         return false;
//       } else {
//         console.log('%sremoving index %s (%s)', indent, index, variants[index].toString());
//         variants.splice(index, 1);
//       }
//     }
//     console.log('%ssuccess', indent);
//     return true;
//   }
// }

// /**
//  * If the variant could contain the pattern
//  */
// export function matchesInternalVariant(patternVariant, variant) {
//   return variant.variants && variant.variants.some(
//     variant => variant.matches(patternVariant)
//   );
// }

// function edgeListToMatrix(edges) {
//   const maxLength = Math.max(...edges.map(([e1, e2]) => Math.max(e1, e2))) + 1;
//   const matrix = zeros([maxLength, maxLength]);
//   for (const [e1, e2] of edges) {
//     matrix[e1][e2] = 1;
//   }
//   return matrix;
// }
