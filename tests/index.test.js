import { parse } from '../src/';
import { SequenceVariant } from '../src/elements';

describe('parsing', function () {
  it('should return a SequenceVariant object when given a string', function () {
    expect(parse('NC00001_1.11:g.123123T>C')).toBeInstanceOf(SequenceVariant);
    expect(parse('NC00001_1:g.[123T>C];[123T>C](;)[345G>A]')).toBeInstanceOf(SequenceVariant);
  });

  it('should raise an error when a malformed sequence variant is provided', function () {
    expect(()=>parse('NC0001_1.11:g.[')).toThrow();
    expect(()=>parse('NC0001_1.11:g.[A]')).toThrow();
    expect(()=>parse('NC0001_1.11:g.[A>T]')).toThrow();
    expect(()=>parse('NC0001_1.11:g.[123A>]')).toThrow();
    expect(()=>parse('NC0001_1.11:g.[A(;)[123T>C]')).toThrow();
    expect(()=>parse('NC0001_1.11:g.[123A>C];[A(;)[123T>C]')).toThrow();
  });
});

describe('matching a SequenceVariant to a pattern', function () {
  it('should match an identical simple variant', function () {
    const pattern = parse('NC0001_1.11:g.123T>C');
    const variant = parse('NC0001_1.11:g.123T>C');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should match an identical simple variant case insensitively', function () {
    const pattern = parse('NC0001_1.11:g.123T>C');
    const variant = parse('NC0001_1.11:g.123t>c');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should match a wild type simple variant case', function () {
    const pattern = parse('NC0001_1.11:g.123=');
    const variant = parse('NC0001_1.11:g.123=');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should not match a wild type to an edit', function () {
    const pattern = parse('NC0001_1.11:g.123=');
    const variant = parse('NC0001_1.11:g.123T>C');
    expect(variant.matches(pattern)).toBeFalsy();
  });


  it('should not match an edit to a wild type pattern', function () {
    const pattern = parse('NC0001_1.11:g.123T>C');
    const variant = parse('NC0001_1.11:g.123=');
    expect(variant.matches(pattern)).toBeFalsy();
  });

  it('should not match a simple variant at a different position', function () {
    const pattern = parse('NC0001_1.11:g.123T>C');
    const variant = parse('NC0001_1.11:g.345T>C');
    expect(variant.matches(pattern)).toBeFalsy();
  });

  it('should not match a simple variant with a different edit', function () {
    const pattern = parse('NC0001_1.11:g.123T>C');
    const variant = parse('NC0001_1.11:g.123G>A');
    expect(variant.matches(pattern)).toBeFalsy();
  });

  it('should match an identical cis variant', function () {
    const pattern = parse('NC0001_1.11:g.[123T>C]');
    const variant = parse('NC0001_1.11:g.[123T>C]');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should match an identical cis variant with multiple variants', function () {
    const pattern = parse('NC0001_1.11:g.[123T>C;345G>A]');
    const variant = parse('NC0001_1.11:g.[123T>C;345G>A]');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should match an identical cis variant with variants in different order', function () {
    const pattern = parse('NC0001_1.11:g.[345G>A;123T>C]');
    const variant = parse('NC0001_1.11:g.[123T>C;345G>A]');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should match an identical trans variant', function () {
    const pattern = parse('NC0001_1.11:g.[123T>C];[345G>A]');
    const variant = parse('NC0001_1.11:g.[123T>C];[345G>A]');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should match a trans variant with differently ordered cis variants', function () {
    const pattern = parse('NC0001_1.11:g.[345G>A];[123T>C]');
    const variant = parse('NC0001_1.11:g.[123T>C];[345G>A]');
    expect(variant.matches(pattern)).toBeTruthy();
  });
  it('should match an identical unphased variant', function () {
    const pattern = parse('NC0001_1.11:g.[123T>C](;)[345G>A]');
    const variant = parse('NC0001_1.11:g.[123T>C](;)[345G>A]');
    expect(variant.matches(pattern)).toBeTruthy();
  });
  it('should match an unphased variant with differently ordered sub variants variants', function () {
    const pattern = parse('NC0001_1.11:g.[345G>A](;)[123T>C]');
    const variant = parse('NC0001_1.11:g.[123T>C](;)[345G>A]');
    expect(variant.matches(pattern)).toBeTruthy();
  });

  it('should match a complex variant with a pattern representing the same thing with different order', function () {
    const pattern = parse('NC0001_1.11:g.[123T>C](;)[345G>A]');
    const variant = parse('NC0001_1.11:g.[678A>T;345G>A];[123T>C];[999=]');

    expect(variant.matches(pattern)).toBeTruthy();
  });
});
