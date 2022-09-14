import { UserTypes } from '../enums';

const UserLocale = {
	en: {
		[UserTypes.MAINTAINER]: 'maintainer',
		[UserTypes.DEVELOPER]: 'developer',
		[UserTypes.GUEST]: 'guest',
		'user-type': 'User type'
	},
	ru: {
		[UserTypes.MAINTAINER]: 'админ',
		[UserTypes.DEVELOPER]: 'разработчик',
		[UserTypes.GUEST]: 'гость',
		'user-type': 'Тип пользователя'
	}
};

export default UserLocale;
