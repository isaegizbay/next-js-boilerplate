import { EntityNames } from "@app/shared/Entity/enums/EntityNames";

const tranlations = {
	en: {
		[EntityNames.MEMBER]: 'Members',

		profile: 'Profile',
		'profile-settings': 'Settings',
		'profile-permissions': 'Permissions'
	},
	ru: {
		[EntityNames.MEMBER]: 'Пользователи',

		profile: 'Профиль',
		'profile-settings': 'Настройки',
		'profile-permissions': 'Доступы'
	}
};

export default tranlations;
