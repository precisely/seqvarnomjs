import { SVN } from './svn';
export * from './elements';
export * from './constants';

export function parse(s) {
  try {
    return SVN.matchAll(s, 'svnVariant');
  } catch (e) {
    if (e.message === 'SyntaxError: match failed') {
      throw new Error(`Bad input: ${s}`);
    } else {
      throw new Error(`Bad input: ${s} - ${e.message}`);
    }
  }
}
