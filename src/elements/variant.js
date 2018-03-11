import { LogicExpr }  from './logic';

/**
 * A variant of a named biological sequence
 * @export
 * @class SequenceVariant
 * @extends {LogicExpr}
 */
export class SequenceVariant extends LogicExpr {
  constructor({ ac, type, variant }) {
    super();
    this.ac = ac;
    this.type = type;
    this.variant = variant;
  }

  match(pattern) {
    if (pattern instanceof SequenceVariant) {
      return (
        this.ac === other.ac &&
        this.type === other.type &&
        (!pattern.variant || this.variant.match(pattern.variant))
      );
    } else if (this.variant) {
      return this.variant.match(pattern);
    }
  }

  toString() {
    return `${this.ac.toString()}:${this.type}${this.variant.toString()}`;
  }
}

class SubSequenceVariant extends LogicExpr {}
export class UnphasedVariant extends SubSequenceVariant {
  constructor({ variants }) {
    super();
    this.variants = variants;
  }

  get type() {
    return 'unphased';
  }

  match(pattern) {
    if (pattern instanceof UnphasedVariant) {
      // find a match amongst the phased variants
      return !pattern.variants || pattern.variants.map(pvariant=>findMatchInArray(this.variants, pvariant));
    } else {
      // see if any of the phased variants match this pattern     return this.variants.some(variant=>variant.match(pattern));
    }
  }

  toString() {
    return this.variants(v=>toString()).join('(;)');
  }
}

export class TransVariant extends SubSequenceVariant {
  constructor({ variants }) {
    super();
    this.variants = variants;
  }

  get type() {
    return 'trans';
  }

  toString() {
    return this.variants(v=>v.toString()).join(';');
  }
}

export class CisVariant extends SubSequenceVariant { // aka Allele
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
}

export class SimpleVariant extends SubSequenceVariant {
  constructor({ pos, edit, uncertain }) {
    super();
    this.pos = pos;
    this.edit = edit;
    this.uncertain = uncertain || false;
  }

  setUncertain() {
    this.uncertain = this.uncertain;
    return this;
  }

  get type() {
    return 'posedit';
  }

  toString() {
    if (this.uncertain) {
      return `(${this.pos.toString()}${this.edit ? this.edit.toString() : '='})`;
    } else {
      return `${this.pos.toString()}${this.edit ? this.edit.toString() : '='}`;
    }
  }
}

