import { Interval } from "./interval.js";

export class Database {
  /** @type {string} */
  #name;

  /** @type {Interval[]} */
  #intervals;

  get intervals() {
    return this.#intervals;
  }

  /**
   * @param {string} name
   */
  constructor(name) {
    this.#name = name;
    let intervals = localStorage.getItem(this.#name);
    if (intervals === null) {
      intervals = JSON.stringify([]);
      localStorage.setItem(this.#name, intervals);
    }
    this.#intervals = /** @type {any[]} */(JSON.parse(intervals)).map(o => new Interval(o.start, o.end));
  }

  /**
   * @param {Interval} interval
   */
  insert(interval) {
    this.#intervals.push(interval);
    localStorage.setItem(this.#name, JSON.stringify(this.#intervals));
  }

  drop() {
    this.#intervals.length = 0;
    localStorage.removeItem(this.#name);
  }
}
