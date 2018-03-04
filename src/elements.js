import { clone } from 'lodash';
export function deepcopy(o) { return clone(o); }

export function SequenceVariant(o) { return { _type:'SequenceVariant', ...o}; }
export function SimplePosition(o) { return o; }
export function Interval(o) { return { _type:"Interval", ...o}; }
export function NARefAlt(o) { return { _type:"NARefAlt", ...o}; }
export function PosEdit(o) {return { _type:"PosEdit", ...o}; }