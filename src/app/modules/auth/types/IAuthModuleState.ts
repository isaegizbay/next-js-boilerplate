import type { AuthDto } from "@app/shared/User/types/AuthDto";

export interface IAuthModuleState {
  isUserLoading: boolean;
  isAuthLoading: boolean;
  authDto: AuthDto | null
}
