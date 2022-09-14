import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { AppDispatch } from './AppDispatch';

export interface IModule<
	State,
	Actions extends CaseReducerActions<SliceCaseReducers<unknown>>
> {
	readonly state: State;
	readonly actions: Actions;
	readonly dispatch: AppDispatch;
	initModule(state: State, actions: Actions, dispatch: AppDispatch): void;
}
