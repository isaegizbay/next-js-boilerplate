// import { IMembersState } from 'app/modules/member/storage';
// import { EntityNames } from 'app/shared/Entity/enums';
// import { EntityModule, EntityModuleFactory } from 'app/shared/Entity/classes';
// import type { IEntity } from 'app/shared/Entity/types';
// import { AuthModule } from 'app/modules/auth/storage';
// import { appContainer } from 'app/container/constants';
// import { AuthService } from 'app/modules/auth/services';
// import { TYPES } from 'app/container/constants/TYPES';
// import { store } from './redux/store';
//
// export interface IRootState {
// 	members: IMembersState;
// }
//
// export type EntityModulesMap = Record<
// 	EntityNames,
// 	EntityModule<IEntity, any, any>
// >;
// export type Modules = EntityModulesMap & {
// 	auth: AuthModule;
// };
//
// export class ModulesStorage {
// 	private readonly store = store;
// 	private readonly _modules: Modules;
//
// 	constructor() {
// 		this.store = new VuexStore<IRootState>({});
// 		this._modules = {
// 			...this.entityModules,
// 			auth: new AuthModule(
// 				appContainer.get<AuthService>(TYPES.AuthService),
// 				this.store
// 			)
// 			// other non-entity storage modules go here
// 		};
// 	}
//
// 	private get entityModules(): EntityModulesMap {
// 		const entityModules: any = {};
//
// 		Object.values(EntityNames).forEach((entityName: EntityNames) => {
// 			const module = EntityModuleFactory.getModule(entityName, this.store);
// 			entityModules[entityName] = module;
// 		});
//
// 		return entityModules;
// 	}
//
// 	get modules(): Modules {
// 		return this._modules;
// 	}
// }
