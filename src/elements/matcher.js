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
