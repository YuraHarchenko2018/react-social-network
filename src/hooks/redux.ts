import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import setupStore, { rootReducer } from "../redux/redux";

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
