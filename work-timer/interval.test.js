import { assert } from "./test-util.js";
import { Interval } from "./interval.js";

export const url = import.meta.url;

export function intervalLength_zero() {
  const interval = new Interval(0, 0);
  assert(interval.length === 0, `Default interval length is ${interval.length}, not 0`);
}

export function intervalLength_nonZero() {
  const now = new Date();
  const intervalLength = 12345; // ms
  const interval = new Interval(now.valueOf(), now.valueOf() + intervalLength);
  assert(interval.length === intervalLength, `Interval length is ${interval.length}, not ${intervalLength}`);
}
