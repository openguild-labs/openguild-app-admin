import { useDispatch, useSelector } from "react-redux";
import type { TRootState, TAppDispatch } from "./index";

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
