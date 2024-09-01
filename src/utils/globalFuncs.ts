import { IRank, IUserPositionData } from "@/types/dataTypes";
import { QueryDocumentSnapshot } from "firebase/firestore";

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

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const getYYMMDD = (date: Date) => {
  return `${date.getFullYear() % 100}-${addZeroToNumber(
    date.getMonth()
  )}-${addZeroToNumber(date.getDate())}`;
};

export const addZeroToNumber = (numb: number) => {
  return numb >= 10 ? `${numb}` : `0${numb}`;
};

export const paintRank = (rank: number) => {
  switch (rank) {
    case 1:
      return "border-blue font-bold text-blue";
    case 2:
      return "border-green text-green";
    case 3:
      return "border-yellow text-yellow";
    case 4:
      return "border-red text-red";
    default:
      return "";
  }
};
