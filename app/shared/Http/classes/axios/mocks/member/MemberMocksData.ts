import type { AuthDto } from 'app/shared/User/types';
import type { MemberDto } from 'app/modules/member/types';
import { UserTypes } from 'app/shared/User/enums';

type PartialMember = AuthDto | Partial<MemberDto>;

export const DEVELOPER_USER: PartialMember = {
	token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-1',
	id: 1,
	firstName: 'John',
	lastName: 'Doe',
	email: 'john.doe.developer@gmail.com',
	userType: UserTypes.DEVELOPER,

	invited: false,
	invitedAt: null,

	deleted: false,
	deletedAt: null
};

export const MAINTAINER_USER: PartialMember = {
	token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-2',
	id: 2,
	firstName: 'John',
	lastName: 'Doe',
	email: 'john.doe.maintainer@gmail.com',
	userType: UserTypes.MAINTAINER,

	invited: true,
	invitedAt: new Date('12-12-12'),

	deleted: false,
	deletedAt: null
};

export const GUEST_USER: PartialMember = {
	token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-3',
	id: 3,
	firstName: 'John',
	lastName: 'Doe',
	email: 'john.doe.guest@gmail.com',
	userType: UserTypes.GUEST,

	invited: false,
	invitedAt: null,

	deleted: false,
	deletedAt: null
};

const otherUsers: PartialMember[] = [
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-4',
		id: 4,
		firstName: 'Some',
		lastName: 'One',
		email: 'some.one.guest@gmail.com',
		userType: UserTypes.GUEST,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-5',
		id: 5,
		firstName: 'Some',
		lastName: 'One',
		email: 'some.one.developer@gmail.com',
		userType: UserTypes.DEVELOPER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-6',
		id: 6,
		firstName: 'Some',
		lastName: 'One',
		email: 'some.one.maintainer@gmail.com',
		userType: UserTypes.MAINTAINER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-7',
		id: 7,
		firstName: 'Some',
		lastName: 'two',
		email: 'some.two.guest@gmail.com',
		userType: UserTypes.GUEST,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-8',
		id: 8,
		firstName: 'Some',
		lastName: 'two',
		email: 'some.two.developer@gmail.com',
		userType: UserTypes.DEVELOPER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-9',
		id: 9,
		firstName: 'Some',
		lastName: 'two',
		email: 'some.two.maintainer@gmail.com',
		userType: UserTypes.MAINTAINER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-10',
		id: 10,
		firstName: 'Some',
		lastName: 'three',
		email: 'some.three.guest@gmail.com',
		userType: UserTypes.GUEST,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-11',
		id: 11,
		firstName: 'Some',
		lastName: 'three',
		email: 'some.three.developer@gmail.com',
		userType: UserTypes.DEVELOPER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-12',
		id: 12,
		firstName: 'Some',
		lastName: 'three',
		email: 'some.three.maintainer@gmail.com',
		userType: UserTypes.MAINTAINER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-13',
		id: 13,
		firstName: 'Some',
		lastName: 'four',
		email: 'some.four.guest@gmail.com',
		userType: UserTypes.GUEST,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-14',
		id: 14,
		firstName: 'Some',
		lastName: 'four',
		email: 'some.four.developer@gmail.com',
		userType: UserTypes.DEVELOPER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-15',
		id: 15,
		firstName: 'Some',
		lastName: 'four',
		email: 'some.four.maintainer@gmail.com',
		userType: UserTypes.MAINTAINER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-16',
		id: 16,
		firstName: 'Some',
		lastName: 'five',
		email: 'some.five.guest@gmail.com',
		userType: UserTypes.GUEST,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-17',
		id: 17,
		firstName: 'Some',
		lastName: 'five',
		email: 'some.five.developer@gmail.com',
		userType: UserTypes.DEVELOPER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	},
	{
		token: 'sdfasdf-fasdfasdf-asdf-asdf-asdf-18',
		id: 18,
		firstName: 'Some',
		lastName: 'five',
		email: 'some.five.maintainer@gmail.com',
		userType: UserTypes.MAINTAINER,

		invited: false,
		invitedAt: null,

		deleted: false,
		deletedAt: null
	}
];

const USERS: PartialMember[] = [DEVELOPER_USER, MAINTAINER_USER, GUEST_USER];

const MEMBERS: PartialMember[] = [...USERS, ...otherUsers];

export class MemberMocksData {
	static members: typeof MEMBERS = JSON.parse(JSON.stringify(MEMBERS));

	static resetData() {
		this.members = JSON.parse(JSON.stringify(MEMBERS));
	}
}

export function mockFetchUser(token: string): Promise<AuthDto> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!token) {
				return reject(new Error('empty token'));
			}

			const user = USERS.find(
				(user) => 'token' in user && user.token === token
			);

			if (!user) {
				return reject(new Error('not authenticated'));
			}

			resolve(user as AuthDto);
		});
	});
}
