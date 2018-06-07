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
    return (pattern instanceof CisVariant || pattern instanceof SimpleVariant)
      && matchesVariant(this, pattern);
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

const VariantClassOrder = [SimpleVariant, CisVariant, UnphasedVariant, TransVariant];

export function variantOrder(variant, pattern) {
  const variantOrder = VariantClassOrder.indexOf(variant.constructor);
  const patternOrder = VariantClassOrder.indexOf(pattern.constructor);

  if (variantOrder >= 0 && patternOrder >=0) {
    return variantOrder - patternOrder;
  } else {
    throw new Error('boo')
  }
}


var matchesVariantDepth = 0; // for debugging
/**
 *
 * @param {*} variant
 * @param {*} patternVariant
 * @param {(variant, pattern) => -1|0|1} comparator
 *   - returns 0 if classes are identical, 1 if variant has a class which encompasses the pattern class
 *
 */
export function matchesVariant(variant, patternVariant) {
  const order = variantOrder(variant, patternVariant);
  console.log(`${'\t'.repeat(matchesVariantDepth)}matchesVariant(${variant.toString()}, ${patternVariant.toString()})`);
  matchesVariantDepth++;
  if (order === 0) {
    // if they are of the same class...
    const result = (
      // either pattern has no variants to check
      !patternVariant.variants
      // or we can find a match for each subvariant in the pattern
      || patternVariant.variants.every(
          pv => variant.variants.find(v => v.matches(pv))
      ) // terminates at SimpleVariant
    );
    console.log(`${'\t'.repeat()} (order==0)=>${result}`);
    console.flush();
    matchesVariantDepth--;
    return result;
  } else if (order > 0) { // variant is higher order than pattern...
    // see if one of the variant's subvariants matches the pattern...
    const result = variant.variants && variant.variants.some(variant => matchesVariant(variant, patternVariant));
    console.log(`${'\t'.repeat()} (order>0) =>${result}`);
    console.flush();
    matchesVariantDepth--;
    return result;

  } else {
    // variant is lower or unknown order
    // this means there is no way the variant could contain the pattern
    console.log(`${'\t'.repeat()} (lower order) =>${order}`);
    matchesVariantDepth--;
    return false;
  }
}
