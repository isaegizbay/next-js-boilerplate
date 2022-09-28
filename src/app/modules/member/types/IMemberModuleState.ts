import type { IEntityModuleState } from "@app/shared/Entity/types/IEntityModuleState";
import { Member } from "@app/modules/member/models/Member.model";

export interface IMemberModuleState extends IEntityModuleState<Member> {
	counter: number;
}
