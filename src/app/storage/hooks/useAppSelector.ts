import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from "@app/storage/types/RootState";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
