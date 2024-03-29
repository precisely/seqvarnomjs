import { isFunction, isString } from 'util';

export function sameClass(x, y) {
  return x===y || (x && x.prototype && x.prototype) === (y && y.prototype && y.prototype);
}

/**
 * Checks whether the object (left param) contains the pattern (right param)
 * @param {*} obj 
 * @param {*} pattern 
 */
export function matches(obj, pattern) {
  return (
    obj === pattern
    ||
    (!obj && !pattern) // both are falsy
    ||
    (isString(obj) && isString(pattern) && obj.toLowerCase() === pattern.toLowerCase())
    ||
    (obj && isFunction(obj.matches)
    &&
    obj.matches(pattern))
  );
}
