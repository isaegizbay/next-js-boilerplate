// import { EntityNames } from 'app/shared/Entity/enums';
// import { IRootState } from 'app/storage/ModulesStorage';
// import { EntityModule } from "app/shared/Entity/classes/EntityModule";
// import { IEntity } from "app/shared/Entity/types";
// import { IMemberService } from "app/modules/member/types";
// import { appContainer } from "app/container/constants";
// import { MemberService } from "app/modules/member/services";
// import { TYPES } from "app/container/constants/TYPES";
// import { MemberModule } from "app/modules/member/storage";
//
// export class EntityModuleFactory {
// 	static getModule(
// 		entityName: EntityNames
// 	): EntityModule<IEntity, unknown, unknown> {
// 		if (entityName === EntityNames.MEMBER) {
// 			{
// 				const memberService = appContainer.get<IMemberService>(
// 					TYPES.MemberService
// 				);
// 				return new MemberModule(memberService, );
// 			}
// 		} else if (entityName === EntityNames.EXPERIMENT) {
// 			{
// 				const experimentService = container.get<IExperimentService>(
// 					DependencyIds.ExperimentService
// 				);
// 				return new ExperimentModule(experimentService, store);
// 			}
// 		} else {
// 			throw new Error(`Module for ${entityName} doesn't exist`);
// 		}
// 	}
// }
