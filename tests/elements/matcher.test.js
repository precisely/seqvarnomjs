import { matches } from '../../src/elements/matcher';
import { SimpleVariant, NARefAlt } from '../../src/elements';

describe('matches', function () {
  it('should match two identical objects', function () {
    const x = new SimpleVariant({});
    expect(matches(x,x)).toBeTruthy();
  });
  it('should match two strings case insensitively', function () {
    expect(matches('GATTACA', 'gattaca')).toBeTruthy();
  });

  it('should match falsy values', function () {
    expect(matches(null, undefined)).toBeTruthy();
    expect(matches(false, undefined)).toBeTruthy();
    expect(matches(false, null)).toBeTruthy();
  });

  it('should match wild-type SimpleVariant', function () {
    expect(matches(
      new SimpleVariant({ pos: 100 }),
      new SimpleVariant({ pos: 100 })
    )).toBeTruthy();
  });

  it('should match refAlt SimpleVariant', function () {
    expect(matches(
      new SimpleVariant({ pos: 100, edit: new NARefAlt({ ref: 'a', alt: 't' }) }),
      new SimpleVariant({ pos: 100, edit: new NARefAlt({ ref: 'A', alt: 'T' }) })
    )).toBeTruthy();
  });

  it('should not match SimpleVariant with different variant at same position', function () {
    expect(matches(
      new SimpleVariant({ pos: 100, edit: new NARefAlt({ ref: 'A', alt: 'T' }) }),
      new SimpleVariant({ pos: 100, edit: new NARefAlt({ ref: 'G', alt: 'T' }) })
    )).toBeFalsy();
  });

  it('should not match an undefined value to an object', function () {
    expect(matches(undefined, new NARefAlt({ ref: 'a', alt: 't' }))).toBeFalsy();
  });

  it('should not match a wild-type SimpleVariant with a refAlt SimpleVariant', function () {
    debugger;
    expect(matches(
      new SimpleVariant({ pos: 100 }),
      new SimpleVariant({ pos: 100, edit: new NARefAlt({ ref: 'A', alt: 'T' }) })
    )).toBeFalsy();
  });

  it('should not match the same refAlt at a different location ', function () {
    debugger;
    expect(matches(
      new SimpleVariant({ pos: 200, edit: new NARefAlt({ ref: 'A', alt: 'T' }) }),
      new SimpleVariant({ pos: 100, edit: new NARefAlt({ ref: 'A', alt: 'T' }) })
    )).toBeFalsy();
  });
});
