const { SVN } = require('./svn');
export { elements } from 'elements';

export function parse(s) {
  return SVN.matchAll(s, 'svnVariant');
}
