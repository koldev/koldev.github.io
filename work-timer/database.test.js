import { assert } from "./test-util.js";
import { Interval } from "./interval.js";
import { Database } from "./database.js";

export const url = import.meta.url;

export function databaseInsert_empty() {
  const database = new Database("test");
  try {
    assert(database.intervals.length === 0, `Default database interval count is ${database.intervals.length}, not 0`);
  } finally {
    database.drop();
  }
}

export function databaseInsert_nonEmpty() {
  const now = new Date();
  const intervals = [1, 2, 3].map(n => new Interval(now.valueOf(), now.valueOf() + n * 1000));
  const database = new Database("test");
  try {
    intervals.forEach(interval => database.insert(interval));
    assert(database.intervals.length === intervals.length, `Database interval count is ${database.intervals.length}, not ${intervals.length}`);
    for (let i = 0; i < intervals.length; ++i) {
      assert(database.intervals[i] === intervals[i], `Database interval #${i + 1} is ${database.intervals[i].toString()}, not ${intervals[i].toString()}`);
    }
  } finally {
    database.drop();
  }
}
