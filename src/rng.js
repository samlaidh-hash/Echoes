let rngState = 1;

export const setSeed = (seed) => {
  const normalized = Number.isFinite(seed) ? seed : 1;
  rngState = normalized >>> 0;
};

export const setState = (state) => {
  rngState = (state ?? 1) >>> 0;
};

export const getState = () => rngState;

const mulberry32 = () => {
  let t = (rngState += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const result = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  return result;
};

export const nextFloat = () => {
  const value = mulberry32();
  return value;
};

export const nextInt = (max) => {
  return Math.floor(nextFloat() * max);
};
