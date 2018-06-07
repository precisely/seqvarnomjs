import { matches, matchesVariant } from './matcher';

export class SequenceVariant {
  constructor({ ac, type, variant }) {
    this.ac = ac;
    this.type = type;
    this.variant = variant;
  }

  toString() {
    return `${this.ac.toString()}:${this.type}.${this.variant.toString()}`;
  }

  matches(pattern) {
    return (
      pattern instanceof SequenceVariant
      && matches(this.ac, pattern.ac)
      && matches(this.type, pattern.type)
      && matches(this.variant, pattern.variant)
    );
  }
}

export class UnphasedVariant {
  constructor({ variants }) {
    this.variants = variants;
  }

  get type() {
    return 'unphased';
  }

  toString() {
    return this.variants.map(v => v.toString()).join('(;)');
  }

  matches(pattern) {
    return matchesVariant(this, pattern);
  }
}

export class TransVariant {
  constructor({ variants }) {
    this.variants = variants;
  }

  get type() {
    return 'trans';
  }

  toString() {
    return this.variants.map(v=>v.toString()).join(';');
  }

  matches(pattern) {
    return matchesVariant(this, pattern);
  }
}

export class CisVariant { // aka Allele
  constructor({ variants }) {
    this.variants = variants;
  }

  get type() {
    return 'cis';
  }

  toString() {
    return '[' + this.variants.map(v=>v.toString()).join(';') + ']';
  }


  matches(pattern) {
    return matchesVariant(this, pattern);
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

  matches(pattern) {
    debugger;
    return (
      pattern instanceof SimpleVariant
      && matches(this.pos, pattern.pos)
      && matches(this.edit, pattern.edit)
      && matches(this.uncertain, pattern.uncertain)
    );
  }
}
