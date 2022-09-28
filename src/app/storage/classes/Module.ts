import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { injectable } from "inversify";
import { AppDispatch } from "@app/storage/types/AppDispatch";

@injectable()
export abstract class Module<
	State,
	Actions extends CaseReducerActions<SliceCaseReducers<State>>
> {
	protected _state!: State;
	protected _actions!: Actions;
	protected _dispatch!: AppDispatch;

	get state() {
		return this._state;
	}

	initModule(state: State, actions: Actions, dispatch: AppDispatch) {
		this._state = state;
		this._actions = actions;
		this._dispatch = dispatch;
	}
}
