import { SVN } from './svn';
import { isString } from 'lodash';

export function parse(s) {
  return SVN.match(s, 'svn_variant');
}

export function match(pattern, instance) {
  pattern = isString(pattern) ? parse(pattern) : pattern;
  instance = isString(instance) ? parse(instance) : instance;

  return pattern.findMatchIn(instance);
}
