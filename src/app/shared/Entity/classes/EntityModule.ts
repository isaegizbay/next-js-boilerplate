import { injectable } from 'inversify';
import { CaseReducerActions } from "@reduxjs/toolkit";
import { Module } from "@app/storage/classes/Module";
import { getEntityReducers } from "@app/shared/Entity/functions/getEntityReducers";
import { EntityFormMode } from "@app/shared/Entity/enums/EntityFormMode";
import { mutation } from "@app/storage/decorators/mutation";
import type { IEntity } from "@app/shared/Entity/types/IEntity";
import type { IEntityModuleState } from "@app/shared/Entity/types/IEntityModuleState";
import type { IEntityServiceStrategy } from "@app/shared/Entity/types/IEntityServiceStrategy";
import type { IEntityPagination } from "@app/shared/Entity/types/IEntityPagination";
import { effect } from "@app/storage/decorators/effect";
import { CancelablePromise } from "cancelable-promise";

@injectable()
export class EntityModule<
		Entity extends IEntity,
		CreateEntityPayload,
		UpdateEntityPayload,
		State extends IEntityModuleState<Entity>,
		Actions extends CaseReducerActions<ReturnType<typeof getEntityReducers>>
	>
	extends Module<State, Actions>
{
	constructor(
		protected _service: IEntityServiceStrategy<
			Entity,
			CreateEntityPayload,
			UpdateEntityPayload
		>
	) {
		super();
	}

	@mutation
	setIsEntityModalOpen(_isOpen: boolean) {}

	@mutation
	setEntityFormMode(_mode: EntityFormMode) {}

	@mutation
	setResource(_resource: IEntityPagination<Entity>) {}

	@mutation
	setIsResourceLoading(_isLoading: boolean) {}

	@mutation
	setIsCreateLoading(_isLoading: boolean) {}

	@mutation
	setIsEditLoading(_isLoading: boolean) {}

	@mutation
	setEditingId(_id: number | null) {}

	@mutation
	setDeletingId(_id: number | null) {}

	@mutation
	resetState() {}

	@effect
	async fetch(page = 1): CancelablePromise {
		this.setIsResourceLoading(true);
		await this._service.fetchRecords(page, {
			handleSuccess: (data) => {
				this.setResource(data);
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
		this.setIsResourceLoading(false);
	}

	@effect
	async create(payload: CreateEntityPayload): CancelablePromise {
		this.setIsCreateLoading(true);
		await this._service.createRecord(payload, {
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
		this.setIsCreateLoading(false);
	}

	@effect
	async edit(payload: UpdateEntityPayload): CancelablePromise {
		this.setIsEditLoading(true);
		const p = { id: this.state.editingId, ...payload };

		await this._service.updateRecord(p, {
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

		this.setIsEditLoading(false);
	}

	@effect
	async delete(id: number): CancelablePromise {
		this.setDeletingId(id);

		await this._service.deleteRecord(id, {
			handleSuccess: (data) => {
				console.log(data);
				this.fetch();
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

		this.setDeletingId(null);
	}
}
