import { appContainer } from "@app/container/constants/appContainer";
import { TYPES } from "@app/container/constants/TYPES";
import { MemberModule } from "@app/modules/member/storage/Member.module";
import { memberSlice } from "@app/modules/member/storage/memberSlice";
import { useAppDispatch } from "@app/storage/hooks/useAppDispatch";
import { useAppSelector } from "@app/storage/hooks/useAppSelector";

export function useMemberModule() {
	const state = useAppSelector((state) => state.member);
	const dispatch = useAppDispatch();
	const actions = memberSlice.actions;

	const memberModule = appContainer.get<MemberModule>(TYPES.MemberModule);
	memberModule.initModule(state, actions, dispatch);

	return memberModule;
}
