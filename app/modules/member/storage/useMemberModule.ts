import { appContainer } from 'app/container/constants';
import { TYPES } from 'app/container/constants/TYPES';
import { MemberModule } from 'app/modules/member/storage/Member.module';
import type { IMemberService } from 'app/modules/member/types';
import { memberSlice } from './memberSlice';
import { useAppDispatch, useAppSelector } from 'app/storage';

export function useMemberModule() {
	const state = useAppSelector((state) => state.member);
	const dispatch = useAppDispatch();
	const actions = memberSlice.actions;

	const memberService = appContainer.get<IMemberService>(TYPES.MemberService);
	return new MemberModule(memberService, state, actions, dispatch);
}
