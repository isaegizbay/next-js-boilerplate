import { useDispatch } from 'react-redux';
import type { AppDispatch } from "@app/storage/types/AppDispatch";

export const useAppDispatch: () => AppDispatch = useDispatch;
