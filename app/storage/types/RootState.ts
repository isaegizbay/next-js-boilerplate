import { store } from "../constants/store";

export type RootState = ReturnType<typeof store.getState>;
