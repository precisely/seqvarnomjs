export interface Variant {
  match(pattern: Variant): boolean;
}
export function parse(svn: string): Variant;
