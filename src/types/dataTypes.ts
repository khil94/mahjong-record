export interface IUser {
  currentUma: number;
  history: IUserGameData[];
  id: string;
  name: string;
}

type IRank = 1 | 2 | 3 | 4;

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

export interface IGameData {
  date: Date;
  detail: IGameDetail[];
  id: string;
}
