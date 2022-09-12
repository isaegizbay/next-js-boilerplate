import { AuthDto } from "../../../shared/User/types";

export interface IAuthModuleState {
  isUserLoading: boolean;
  isAuthLoading: boolean;
  authDto: AuthDto | null
}
