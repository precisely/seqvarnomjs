import { matches } from './matcher';

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

export class RelativeVariant {
  _findMatchInsideOf() {
    throw new Error('Method _findMatchInsideOf must be implemented on subclasses of RelativeVariant');
  }

  matches(pattern) {
    return pattern._findMatchInsideOf(this);
  }
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

  _findMatchInsideOf(other) {
    if (other instanceof UnphasedVariant || other instanceof TransVariant || other instanceof CisVariant) {
      return matchesSameClassVariant(this, other);
    }
    return false;
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

  _findMatchInsideOf(other) {
    return other instanceof TransVariant && matchesSameClassVariant(this, other);
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

  _findMatchInsideOf(other) {
    if (other instanceof CisVariant) {
      return matchesSameClassVariant(this, other);
    } else if (other instanceof TransVariant) {
      return matchesInternalVariant(this, other);
    } else {
      return false;
    }
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
    return (
      pattern instanceof SimpleVariant
      && matches(this.pos, pattern.pos)
      && matches(this.edit, pattern.edit)
      && matches(this.uncertain, pattern.uncertain)
    );
  }
}

/**
 * If variant and patternVariant are the same class:
 */
export function matchesSameClassVariant(patternVariant, variant) {
  return !patternVariant.variants // either pattern has no variants to check
    ||
    patternVariant.variants.every( // or we can find a match for each subvariant in the pattern
      pv => variant.variants.find(v => v.matches(pv))
    );
}

/**
 * If the variant could contain the pattern
 */
export function matchesInternalVariant(patternVariant, variant) {
  return variant.variants && variant.variants.some(
    variant => variant.matches(patternVariant)
  );
}
