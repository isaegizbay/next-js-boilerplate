import { UserTypes } from "@app/shared/User/enums/UserTypes";

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
