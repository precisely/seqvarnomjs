export interface Variant {
  match(pattern: Variant): boolean;
  toString(): string;
}
export function parse(svn: string): Variant;
