import { clone } from 'lodash';

export function deepcopy(o) {
  return clone(o);
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
