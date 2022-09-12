import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { AppDispatch } from '../types';

export abstract class BaseModule<
	State,
	Actions extends CaseReducerActions<SliceCaseReducers<State>> | any
> {
	protected constructor(
		protected _state: State,
		protected _actions: Actions,
		protected _dispatch: AppDispatch
	) {}

	get state() {
		return this._state;
	}
}
