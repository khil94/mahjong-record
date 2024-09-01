import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// 커스텀 훅으로 타입이 지정된 dispatch 사용
export const useAppDispatch = <T extends Dispatch<UnknownAction>>() =>
  useDispatch<T>();
