import { variantOrder, SimpleVariant, CisVariant, TransVariant, UnphasedVariant  } from '../src/elements';

describe('variantOrder', function () {
  it('should return > 0 when variant encompasses pattern', function () {
    expect(variantOrder(new UnphasedVariant({}), new TransVariant({}))).toBeGreaterThan(0);
    expect(variantOrder(new UnphasedVariant({}), new SimpleVariant({}))).toBeGreaterThan(0);
    expect(variantOrder(new TransVariant({}), new CisVariant({}))).toBeGreaterThan(0);
  });

  it('should return < 0 when pattern encompasses variant', function () {
    expect(variantOrder(new TransVariant({}), new UnphasedVariant({}))).toBeLessThan(0);
    expect(variantOrder(new SimpleVariant({}), new UnphasedVariant({}))).toBeLessThan(0);
    expect(variantOrder(new CisVariant({}), new TransVariant({}))).toBeLessThan(0);
  });

  it('should return 0 when pattern encompasses variant', function () {
    expect(variantOrder(new TransVariant({}), new TransVariant({}))).toEqual(0);
    expect(variantOrder(new UnphasedVariant({}), new UnphasedVariant({}))).toEqual(0);
  });

  it('should returned undefined when it cannot match variants', function () {
    expect(variantOrder(new TransVariant({}), 'afasdf')).toBeUndefined();
    expect(variantOrder(123, 'afasdf')).toBeUndefined();
    expect(variantOrder(123, 1233)).toBeUndefined();
  });
});

