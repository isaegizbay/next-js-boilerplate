import { injectable } from 'inversify';
import type {
	IEntity,
	IEntityModuleState,
	IEntityPagination,
	IEntityServiceStrategy
} from '../types';
import { EntityFormMode } from '../enums';
import { entityReducers } from '../constants';
import { CaseReducerActions } from '@reduxjs/toolkit';
import { Module } from 'app/storage/classes/Module';

@injectable()
export class EntityModule<
	Entity extends IEntity,
	CreateEntityPayload,
	UpdateEntityPayload,
	State extends IEntityModuleState<Entity>,
	Actions extends CaseReducerActions<typeof entityReducers>
> extends Module<State, Actions> {
	constructor(
		protected _service: IEntityServiceStrategy<
			Entity,
			CreateEntityPayload,
			UpdateEntityPayload
		>
	) {
		super();
	}

	setIsEntityModalOpen(isOpen: boolean) {
		this._dispatch(this._actions.setIsEntityModalOpen(isOpen));
	}

	setEntityFormMode(mode: EntityFormMode) {
		this._dispatch(this._actions.setEntityFormMode(mode));
	}

	setResource(resource: IEntityPagination<Entity>) {
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

	create(payload: CreateEntityPayload) {
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

	edit(payload: UpdateEntityPayload) {
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
