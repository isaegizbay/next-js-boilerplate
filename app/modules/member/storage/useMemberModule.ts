import { appContainer } from 'app/container/constants';
import { TYPES } from 'app/container/constants/TYPES';
import { memberSlice } from './memberSlice';
import { useAppDispatch, useAppSelector } from 'app/storage';
import { MemberModule } from './Member.module';

export function useMemberModule() {
	const state = useAppSelector((state) => state.member);
	const dispatch = useAppDispatch();
	const actions = memberSlice.actions;

	const memberModule = appContainer.get<MemberModule>(TYPES.MemberModule);
	memberModule.initModule(state, actions, dispatch);

	return memberModule;
}
