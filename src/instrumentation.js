export async function register() {
  // Node.js 25+ exposes a global localStorage that is broken when
  // --localstorage-file is not properly configured (getItem is undefined).
  // Remove it to prevent errors during SSR.
  if (typeof window === 'undefined' && typeof globalThis.localStorage !== 'undefined') {
    delete globalThis.localStorage;
  }
}
