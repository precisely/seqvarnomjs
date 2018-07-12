export interface Variant {
  matches(pattern: Variant): boolean;
  toString(): string;
  readonly ac: string;
  variant: any;
}
export function parse(svn: string): Variant;
