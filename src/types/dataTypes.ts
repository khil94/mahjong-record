export interface IUser {
  currentUma: number;
  history: IUserGameData[];
  id: string;
  name: string;
}

export type IRank = 1 | 2 | 3 | 4;

export interface IUserGameData {
  date: string;
  rank: IRank;
  gameId: string;
  score: number;
  uma: number;
  changedUma: number;
}

export interface IGameDetail {
  rank: IRank;
  score: number;
  uma: number;
  userName: string;
  userId: string;
  changedUma: number;
}

export interface IGameRough {
  score: number;
  uma: number;
  id: string;
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
