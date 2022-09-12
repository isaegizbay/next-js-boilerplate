import type {
	IEntity,
	IEntityModuleState,
	IEntityPagination,
	IEntityServiceStrategy
} from '../types';
import { EntityFormMode } from '../enums';
import { BaseModule } from 'app/storage/classes/BaseModule';
import { AppDispatch } from 'app/storage/types';
import { entityReducers } from '../constants';
import { CaseReducerActions } from '@reduxjs/toolkit';

export abstract class EntityModule<E extends IEntity, C, U> extends BaseModule<
	IEntityModuleState<E>,
	CaseReducerActions<typeof entityReducers>
> {
	protected constructor(
		protected _service: IEntityServiceStrategy<E, C, U>,
		protected _state: IEntityModuleState<E>,
		protected _actions: CaseReducerActions<typeof entityReducers>,
		protected _dispatch: AppDispatch
	) {
		super(_state, _actions, _dispatch);
	}

	setIsEntityModalOpen(isOpen: boolean) {
		this._dispatch(this._actions.setIsEntityModalOpen(isOpen));
	}

	setEntityFormMode(mode: EntityFormMode) {
		this._dispatch(this._actions.setEntityFormMode(mode));
	}

	setResource(resource: IEntityPagination<E>) {
		this._dispatch(this._actions.setResource(resource));
	}

	setIsResourceLoading(isLoading: boolean) {
		this._dispatch(this._actions.setIsResourceLoading(isLoading));
	}

	setIsCreateLoading(isLoading: boolean) {
		this._dispatch(this._actions.setIsCreateLoading(isLoading));
	}

	setIsEditLoading(isLoading: boolean) {
		this._dispatch(this._actions.setIsEditLoading(isLoading));
	}

	setEditingId(id: number | null) {
		this._dispatch(this._actions.setEditingId(id));
	}

	setDeletingId(id: number | null) {
		this._dispatch(this._actions.setDeletingId(id));
	}

	resetState() {
		this._dispatch(
			this._actions.resetState({
				deletingId: null,
				editingId: null,
				entityFormMode: EntityFormMode.CREATE,
				isCreateLoading: false,
				isEditLoading: false,
				isEntityModalOpen: false,
				isResourceLoading: false,
				resource: null
			})
		);
	}

	fetch(page = 1) {
		this.setIsResourceLoading(true);
		this._service.fetchRecords(page, {
			handleSuccess: (data) => {
				this.setResource(data);
				this.setIsResourceLoading(false);
			},
			// TODO handle errors properly
			handleClientError(error: Error) {
				console.error('Fetch action failed, client error', error);
			},
			handleNetworkError(error: Error) {
				console.error('Fetch action failed, client error', error);
			},
			handleTimeoutError(error: Error) {
				console.error('Fetch action failed, client error', error);
			},
			handleServerError(error: Error) {
				console.error('Fetch action failed, client error', error);
			},
			handleUnexpectedError(error: Error) {
				console.error('Fetch action failed, client error', error);
			}
		});
	}

	create(payload: C) {
		this.setIsCreateLoading(true);
		this._service.createRecord(payload, {
			handleSuccess: (data) => {
				this.fetch();
				console.log(data);
			},
			// TODO handle errors properly
			handleClientError(error: Error) {
				console.error('Create action failed, client error', error);
			},
			handleNetworkError(error: Error) {
				console.error('Create action failed, network error', error);
			},
			handleTimeoutError(error: Error) {
				console.error('Create action failed, timeout error', error);
			},
			handleServerError(error: Error) {
				console.error('Create action failed, server error', error);
			},
			handleUnexpectedError(error: Error) {
				console.error('Create action failed, unexpected error', error);
			}
		});
	}

	edit(payload: U) {
		this.setIsEditLoading(true);
		const p = { id: this.state.editingId, ...payload };
		this._service.updateRecord(p, {
			handleSuccess: (data) => {
				console.log(data);
				this.fetch();
				this.setIsEditLoading(false);
			},
			// TODO handle errors properly
			handleClientError(error: Error) {
				console.error('Edit action failed, client error', error);
			},
			handleNetworkError(error: Error) {
				console.error('Edit action failed, network error', error);
			},
			handleTimeoutError(error: Error) {
				console.error('Edit action failed, timeout error', error);
			},
			handleServerError(error: Error) {
				console.error('Edit action failed, server error', error);
			},
			handleUnexpectedError(error: Error) {
				console.error('Edit action failed, unexpected error', error);
			}
		});
	}

	delete(id: number) {
		this.setDeletingId(id);
		this._service.deleteRecord(id, {
			handleSuccess: (data) => {
				console.log(data);
				this.fetch();
				this.setDeletingId(null);
			},
			// TODO handle errors properly
			handleClientError(error: Error) {
				console.error('Delete action failed, client error', error);
			},
			handleNetworkError(error: Error) {
				console.error('Delete action failed, network error', error);
			},
			handleTimeoutError(error: Error) {
				console.error('Delete action failed, timeout error', error);
			},
			handleServerError(error: Error) {
				console.error('Delete action failed, server error', error);
			},
			handleUnexpectedError(error: Error) {
				console.error('Delete action failed, unexpected error', error);
			}
		});
	}
}
