import { store } from "@app/storage/constants/store";

export type RootState = ReturnType<typeof store.getState>;
