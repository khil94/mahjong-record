import { IRank, IUserPositionData } from "@/types/dataTypes";

export const umaClac = (score: number) => {
  const tempScore = (score - 30000) / 1000;
  return Math.round(tempScore);
};

export const finalUmaCalc = (uma: number, rank: IRank) => {
  switch (rank) {
    case 1:
      return uma + 20 + 20;
    case 2:
      return uma + 10;
    case 3:
      return uma - 10;
    case 4:
      return uma - 20;
  }
};

const positionScore = {
  east: 0,
  south: 1,
  west: 2,
  north: 3,
};

export const positionCalc = (
  a: keyof IUserPositionData,
  b: keyof IUserPositionData
) => {
  return positionScore[a] - positionScore[b];
};
