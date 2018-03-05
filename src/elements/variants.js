
export class SequenceVariant {
  constructor({ ac, type, variant }) {
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

function findMatchInArray(array, pattern) {
  return array.some(elt=>elt.match(pattern));
}

export class OrExpr {
  constructor(patterns) {
    this.patterns = patterns;
  }
}

export class UnphasedVariant {
  constructor({ variants }) {
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
}

export class TransVariant {
  constructor({ variants }) {
    this.variants = variants;
  }

  get type() {
    return 'trans';
  }
}

export class CisVariant { // aka Allele
  constructor({ variants }) {
    this.variants = variants;
  }

  get type() {
    return 'cis';
  }
}

export class SimpleVariant {
  constructor({ pos, edit, uncertain }) {
    this.pos = pos;
    this.edit = edit;
    this.uncertain = uncertain || false;
  }

  setUncertain() {
    this.uncertain = this.uncertain;
  }

  get type() {
    return 'posedit';
  }
}
