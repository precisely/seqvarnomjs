export interface Variant {
  matches(pattern: Variant): boolean;
  toString(): string;
  ac: string;
  variant: any;
  listSimpleVariants(): SimpleVariant[];
}

export interface SimpleVariant {
  toString(): string;
  pos: any;
  edit: any;
  uncertain?: boolean;
}

export function parse(svn: string): Variant;
