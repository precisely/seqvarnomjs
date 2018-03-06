export class Edit {
}

export class NARefAlt extends Edit {
  constructor({ ref, alt }) {
    super();
    this.ref = ref;
    this.alt = alt;
  }

  get type() {
    let editType;
    if (this.ref !== null && this.alt !== null) {
      if (this.ref === this.alt) {
        editType = 'identity';
      } else if (this.ref.length === 1 && this.alt.length === 1) {
          editType = 'sub';
      } else {
        editType = 'delins';
      }
    } else if (!this.ref !== null) {
      editType = 'del';
    } else {
      editType = 'ins';
    }
    return editType;
  }

  toString() {
    switch (this.type) {
      case 'identity':
        return '=';
      case 'delins':
      case 'sub':
        return `${this.ref}>${this.alt}`;
      case 'del':
        return `${this.ref}del`;
      case 'ins':
        return `${this.alt}ins`;
      default:
        throw new Error(`Unknown Edit type ${this.type}`);
    }
  }
}

// duplicate
export class Dup extends Edit {
  constructor({ ref:ref, uncertain:uncertain }) {
    super();
    this.ref = ref;
    this.uncertain = uncertain;
  }

  setUncertain() {
    return this.uncertain = true;
  }

  get type() {
    return 'dup';
  }
}

// inversion
export class Inv extends Edit {
  constructor({ ref }) {
    super();
    this.ref = ref;
  }

  get type() {
    return 'inv';
  }
}

// amino acid change - unlike NARefAlt, the ref amino acid
//    in a protein substitution is part of the location
export class AARefAlt extends Edit {
  constructor({ ref, alt }) {
    super();
    this.ref = ref;
    this.alt = alt;
  }

  get type() {
    let editType;
    if (this.ref !== null && this.alt !== null) {
      if (this.ref === this.alt) {
        editType = 'identity';
      } else if (this.ref.length === 1 && this.alt.length === 1) {
          editType = 'sub';
      } else {
        editType = 'delins';
      }
    } else if (this.ref !== null && this.alt == null) {
      editType = 'del';
    } else if (this.ref == null && this.alt !== null) {
      editType = 'ins';
    }
    return editType;
  }
}

// amino acid substitution
export class AASub extends AARefAlt {
  get type() {
    return 'sub';
  }
}

// amino acid extension
export class AAExt extends Edit {
  constructor({ ref, alt, aaterm, length, uncertain }) {
    super();
    this.ref = ref;
    this.alt = alt;
    this.aaterm = aaterm;
    this.length = length;
    this.uncertain = uncertain;
  }
}

/**
 * Class representing an amino acid frameshift mutation
 *
 *
 * @export
 * @class AAFs
 * @extends {Edit}
 */
export class AAFs extends Edit {
  constructor({ ref, alt, length, uncertain }) {
    super();
    this.ref = ref;
    this.alt = alt;
    this.length = length;
    this.uncertain = uncertain;
  }

  setUncertain() {
    this.uncertain = true;
  }

  get type() {
    return 'fs';
  }
}

/**
 * Class representing a conversion
 * http://varnomen.hgvs.org/recommendations/DNA/variant/conversion/
 * E.g., NC_000022.10:g.42522624_42522669con42536337_42536382
 *
 * @export
 * @class Conv
 * @extends {Edit}
 */
export class Conv extends Edit {
  constructor({ fromAc, fromType, fromPos }) {
    super();
    this.fromAc = fromAc;
    this.fromType = fromType;
    this.fromPos = fromPos;
  }

  get type() {
    return 'conv';
  }
}

export class NACopy extends Edit {
  constructor({ copy, uncertain }) {
    super();
    this.copy = copy;
    this.uncertain = uncertain;
  }

  get type() {
    return 'copy';
  }
}

export class Repeat extends Edit {
  constructor({ ref, min, max, uncertain }) {
    super();
    this.ref = ref;
    this.min = min;
    this.max = max;
    this.uncertain = uncertain;
  }

  get type() {
    return 'repeat';
  }
}
