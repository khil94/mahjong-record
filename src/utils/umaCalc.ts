export const umaClac = (score: number) => {
  const tempScore = (score - 30000) / 1000;
  return Math.round(tempScore);
};
