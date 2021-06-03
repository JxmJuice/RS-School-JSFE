export function hashFunc(s: string) {
  return s.split('').reduce((a, b) => {
    const res = (a << 5) - a + b.charCodeAt(0);
    return res & res;
  }, 0);
}
