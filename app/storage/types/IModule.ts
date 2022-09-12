import { CaseReducerActions, SliceCaseReducers } from "@reduxjs/toolkit";
import { AppDispatch } from "./AppDispatch";

export interface IModule<State, Actions extends CaseReducerActions<SliceCaseReducers<unknown>>>{
  state: State,
  actions: Actions,
  dispatch: AppDispatch
}
