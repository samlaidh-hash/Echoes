// Seeded RNG (mulberry32)
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const nextFloat = mulberry32(seed);
  return {
    seed,
    nextFloat,
    nextInt(n) {
      return Math.floor(nextFloat() * n);
    },
    rollDie(sides = 6) {
      return 1 + this.nextInt(sides);
    }
  };
}
