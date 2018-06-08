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

  toString() {
    switch (this.type) {
      case 'point':
        return `${this.start}`;;
      case 'interval':
        return `${this.start}_${this.end}`;
    }
  }

  matches(pattern) {
    return (
      pattern instanceof Interval
      && matches(this.start, pattern.start)
      && matches(this.end, pattern.end)
    );
  }
}

export class BaseOffsetPosition {
  constructor({ base, offset }) {
    this.base = base;
    this.offset = offset;
  }

  matches(pattern) {
    return (
      pattern instanceof BaseOffsetPosition
      && matches(this.base, pattern.base)
      && matches(this.offset, pattern.offset)
    );
  }
}

export class BaseOffsetInterval {
  constructor({ start, end }) {
    this.start = start;
    this.end = end;
  }

  matches(pattern) {
    return (
      pattern instanceof BaseOffsetInterval
      && matches(this.start, pattern.start)
      && matches(this.end, pattern.end)
    );
  }
}

export class AAPosition {
  constructor({ base, aa, datum }) {
    this.base = base;
    this.aa = aa;
    this.datum = datum;
  }

  matches(pattern) {
    return (
      pattern instanceof AAPosition
      && matches(this.base, pattern.base)
      && matches(this.aa, pattern.aa)
      && matches(this.datum, pattern.datum)
    );
  }
}

export class Uncertain {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(${this.value.toString()})`;
  }

  matches(pattern) {
    return (
      pattern instanceof Uncertain
      && matches(this.value, pattern.value)
    );
  }
}
