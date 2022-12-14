import { EntityNames } from "@app/shared/Entity/enums/EntityNames";

const EntityLocale = {
	en: {
		[EntityNames.MEMBER]: 'member',

		table: {
			actions: 'Actions'
		}
	},

	ru: {
		[EntityNames.MEMBER]: 'пользователь',

		table: {
			actions: 'Действия'
		}
	}
};

export default EntityLocale;
