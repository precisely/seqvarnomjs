import { matches } from './matcher';
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

  /**
   * True when the current SequenceVariant object matches the provided pattern 
   * (which must be another SequenceVariant object)
   * @param {*} pattern 
   */
  matches(pattern) {
    if (this.ac === pattern.ac && this.type === pattern.type) {
      const vGraph = this.toGraph();
      const pGraph = pattern.toGraph();
      return vGraph.matches(pGraph);
    }
    return false;
  }

  listSimpleVariants() {
    return this.variant.listSimpleVariants();
  }
}

export class RelativeVariant {
  constructor({ variants }) {
    this.variants = variants;
  }

  listSimpleVariants() {
    if (this.variants) {
      let result = [];
      for (const variant of this.variants) {
        if (variant instanceof SimpleVariant) {
          result.push(variant);
        } else {
          result = [... result, ...variant.listSimpleVariants()];
        }
      }
      return result;
    } else {
      return [];
    }
  }
}

export class UnphasedVariant extends RelativeVariant {
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
    const edit = this.edit || '';
    const pos = this.pos || 'error';
    return `${pos.toString()}${edit.toString()}`;
  }

  toGraph() {
    return new VariantGraph([this]);
  }

  // matches Location and SimpleVariant objects
  matches(pattern) {
    const locationMatch = pattern instanceof SimpleVariant && matches(this.pos, pattern.pos);
    const editMatch = pattern.edit
      ? matches(this.edit, pattern.edit) && matches(this.uncertain, pattern.uncertain)
      : true;

    return locationMatch && editMatch;
  }

  listSimpleVariants() {
    return [this];
  }
}

