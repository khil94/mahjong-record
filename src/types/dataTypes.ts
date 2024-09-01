export interface IUser {
  currentUma: number;
  history: IUserGameData[];
  id: string;
  name: string;
}

export type IRank = 1 | 2 | 3 | 4;

export interface IUserGameData {
  date: Date;
  rank: IRank;
  score: number;
  uma: number;
}

export interface IGameDetail {
  rank: IRank;
  score: number;
  uma: number;
  userName: string;
}

export interface IGameRough {
  score: number;
  uma: number;
  userName: string;
}

export interface IGameData {
  date: string;
  detail: IGameDetail[];
  id: string;
}

export interface IPostGameData {
  date: string;
  detail: IGameDetail[];
}

export interface IUserPositionData {
  north: IGameRough;
  east: IGameRough;
  west: IGameRough;
  south: IGameRough;
}
