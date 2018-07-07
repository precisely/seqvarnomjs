export interface Variant {
  matches(pattern: Variant): boolean;
  toString(): string;
}
export function parse(svn: string): Variant;
