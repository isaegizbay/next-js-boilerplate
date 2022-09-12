import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { AppDispatch } from '../types';

export abstract class BaseModule<
	State,
	Actions extends CaseReducerActions<SliceCaseReducers<State>>
> {
	protected constructor(
		protected _state: State,
		protected _actions: Actions,
		protected _dispatch: AppDispatch
	) {}

	abstract state: State;
}
