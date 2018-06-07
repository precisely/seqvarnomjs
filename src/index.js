import { SVN } from './svn';

export function parse(s) {
  return SVN.matchAll(s, 'svnVariant');
}
