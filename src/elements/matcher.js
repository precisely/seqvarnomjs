import { isFunction, isString } from 'util';

export function sameClass(x, y) {
  return x===y || (x && x.prototype && x.prototype) === (y && y.prototype && y.prototype);
}

export function matches(obj, pattern) {
  return (
    obj === pattern
    ||
    (isString(obj) && isString(pattern) && obj.toLocaleLowerCase() === pattern.toLowerCase())
    ||
    (obj && isFunction(obj.matches)
    &&
    obj.matches(pattern))
  );
}


export function matchesVariant(variant, patternVariant) {
  if (sameClass(patternVariant, variant)) {
    // if they are of the same class...
    const result = (
      // either pattern has no variants to check
      !patternVariant.variants
      // or we can find a match for each subvariant in the pattern
      || patternVariant.variants.every(
          pv => variant.variants.find(v => v.matches(pv))
      ) // terminates at SimpleVariant
    );
    return result;
  } else {
    // see if one of the variant's subvariants matches the pattern...
    return variant.variants && variant.variants.some(variant => matchesVariant(variant, patternVariant));

  }
}
