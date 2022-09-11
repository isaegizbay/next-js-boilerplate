import type {
	IEntity,
	IEntityModuleState,
	IEntityPagination,
	IEntityServiceStrategy
} from '../types';
import { EntityFormMode } from '../enums';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Dispatch } from 'react';
import { entitySlice } from 'app/shared/Entity/constants/entitySlice';

export abstract class EntityModule<E extends IEntity, C, U> {
	abstract state: IEntityModuleState<E>;
	abstract dispatch: ThunkDispatch<
		IEntityModuleState<E>,
		undefined,
		AnyAction
	> &
		Dispatch<AnyAction>;
	abstract entityServiceInstance: IEntityServiceStrategy<E, C, U>;

	setIsEntityModalOpen(isOpen: boolean) {
		this.dispatch(entitySlice.actions.setIsEntityModalOpen(isOpen));
	}

	setEntityFormMode(mode: EntityFormMode) {
		this.dispatch(entitySlice.actions.setEntityFormMode(mode));
	}

	setResource(resource: IEntityPagination<E>) {
		this.dispatch(entitySlice.actions.setResource(resource));
	}

	setIsResourceLoading(isLoading: boolean) {
		this.dispatch(entitySlice.actions.setIsResourceLoading(isLoading));
	}

	setIsCreateLoading(isLoading: boolean) {
		this.dispatch(entitySlice.actions.setIsCreateLoading(isLoading));
	}

	setIsEditLoading(isLoading: boolean) {
		this.dispatch(entitySlice.actions.setIsEditLoading(isLoading));
	}

	setEditingId(id: number | null) {
		this.dispatch(entitySlice.actions.setEditingId(id));
	}

	setDeletingId(id: number | null) {
		this.dispatch(entitySlice.actions.setDeletingId(id));
	}

	resetState() {
		entitySlice.actions.resetState({
			deletingId: null,
			editingId: null,
			entityFormMode: EntityFormMode.CREATE,
			isCreateLoading: false,
			isEditLoading: false,
			isEntityModalOpen: false,
			isResourceLoading: false,
			resource: null
		});
	}

	async fetchById() {
		await new Promise(() => {});
		throw new Error('fetchById not implementeed yet');
	}

	fetch(page: number = 1) {
		this.setIsResourceLoading(true);
		this.entityServiceInstance.fetchRecords(page, {
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
		this.entityServiceInstance.createRecord(payload, {
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
		this.entityServiceInstance.updateRecord(p, {
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
		this.entityServiceInstance.deleteRecord(id, {
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
