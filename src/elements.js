import { clone } from 'lodash';
export function deepcopy(o) { return clone(o); }

export function SequenceVariant(o) { return { _type:'SequenceVariant', ...o}; }
export function SimplePosition(o) { return o; }
export function Interval(o) { return { _type:"Interval", ...o}; }
export function NARefAlt(o) { return { _type:"NARefAlt", ...o}; }
export function PosEdit(o) {return { _type:"PosEdit", ...o}; }
export function Allele(o) { return { _type:"Allele", ...o}; }
export function TransAlleles(o) { return { _type:"TransAlleles", ...o}; }
export function UnphasedAlleles(o) { return { _type:"UnphasedAlleles", ...o}; }
export function BaseOffsetPosition(o) { return { _type:"BaseOffsetPosition", ...o}; }
export function BaseOffsetInterval(o) { return { _type:"BaseOffsetInterval", ...o}; }