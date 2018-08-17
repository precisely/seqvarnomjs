import { SVN } from './svn';
export * from './elements';
export * from './constants';

export function parse(s) {
  return SVN.matchAll(s, 'svnVariant');
}
