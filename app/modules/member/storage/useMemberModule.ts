import { useAppDispatch, useAppSelector } from 'app/storage/redux/hooks';
import { appContainer } from 'app/container/constants';
import { TYPES } from 'app/container/constants/TYPES';
import { MemberModule } from 'app/modules/member/storage/Member.module';
import type { IMemberService } from 'app/modules/member/types';

export function useMemberModule() {
	const state = useAppSelector((state) => state.member);
	const dispatch = useAppDispatch();

	const memberService = appContainer.get<IMemberService>(TYPES.MemberService);
	const memberModule = new MemberModule(memberService, state, dispatch);

	return memberModule
}
