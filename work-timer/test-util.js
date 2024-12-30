/**
 * @param {boolean} b
 * @param {string} [message]
 */
export function assert(b, message) {
  if (!b) {
    throw new Error(message);
  }
}

/**
 * @param {() => void} f
 */
export function assertThrows(f) {
  try {
    f();
  } catch (error) {
    return;
  }
  throw new Error("Exception expected");
}
