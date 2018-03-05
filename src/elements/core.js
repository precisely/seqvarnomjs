import { clone } from 'lodash';

export function deepcopy(o) {
  return clone(o);
}

export class SequenceVariant {
  constructor({ ac, type, variant }) {
    this.ac = ac;
    this.type = type;
    this.variant = variant;
  }

  toString() {
    return `${this.ac.toString()}:${this.type}${this.variant.toString()}`;
  }
}

export class HGVSPosition {
  constructor({ ac, type, variant }) {
    this.ac = ac;
    this.type = type;
    this.variant = variant;
  }

  toString() {
    return `${this.ac.toString()}:${this.type}${this.variant.toString()}`;
  }

}

export class SimplePosition{
  constructor({ pos }) {
    this.position = pos;
  }

  toString() {
    return `${pos}`;
  }

  get type() {
    return 'pos';
  }
}

export class Interval {
  constructor({ start, end }) {
    this.start = start;
    this.end = end;
  }

  get type() {
    if (this.start===this.end) {
      return 'point';
    } else {
      return 'interval';
    }
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

export class CisVariant { // aka Allele
  constructor({ variants }) {
    this.variants = variants;
  }

  get type() {
    return 'cis';
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

export class UnphasedVariant {
  constructor({ variants }) {
    this.variants = variants;
  }

  get type() {
    return 'unphased';
  }
}

export class BaseOffsetPosition {
  constructor({ base, offset }) {
    this.base = base;
    this.offset = offset;
  }
}

export class BaseOffsetInterval {
  constructor({ start, end }) {
    this.start = start;
    this.end = end;
  }
}

export class AAPosition {
  constructor({ base, aa, datum }) {
    this.base = base;
    this.aa = aa;
    this.datum = datum;
  }
}
