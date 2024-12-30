export class Interval {
  /** @type {number} Start of the interval (ms since epoch) */
  #start;

  get start() {
    return this.#start;
  }

  /** @type {number} End of the interval (ms since epoch) */
  #end;

  get end() {
    return this.#end;
  }

  /** Length of the interval (ms) */
  get length() {
    return this.#end - this.#start;
  }

  /**
   * @param {number} start
   * @param {number} end
   */
  constructor(start, end) {
    this.#start = start;
    this.#end = end;
  }

  toJSON() {
    return {
      start: this.#start,
      end: this.#end
    };
  }

  /**
   * @param {string} s
   */
  static parse(s) {
    const o = JSON.parse(s);
    return new Interval(o.start, o.end);
  }
}
