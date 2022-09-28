import { EntityNames } from "@app/shared/Entity/enums/EntityNames";

export const ENTITY_ROUTES = Object.values(EntityNames).map((entityName) => ({
	label: `layout.routes.${entityName}`,
	path: `/${entityName}/list`,
	name: entityName
}));
