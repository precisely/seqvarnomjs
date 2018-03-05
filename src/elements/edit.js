export class Edit {
}

export class NARefAlt extends Edit {
  constructor({ ref, alt }) {
    super();
    this.ref = ref;
    this.alt = alt;
  }

  type() {
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
}


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

export class Inv extends Edit {
  constructor({ ref }) {
    super();
    this.ref = ref;
  }

  get type() {
    return 'inv';
  }
}

export class AARefAlt extends Edit {
  constructor({ ref, alt }) {
    super();
    this.ref = ref;
    this.alt = alt;
  }

  type() {
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

export class AASub extends AARefAlt {
  type() {
    return 'sub';
  }
}

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
