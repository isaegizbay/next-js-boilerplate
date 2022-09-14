export const TYPES = {
	// Shared
	AxiosCreator: Symbol.for('AxiosCreator'),
	ModulesStorage: Symbol.for('ModulesStorage'),
	MockAxiosActionTypes: Symbol.for('MockAxiosActionTypes'),

	// Auth
	AuthModule: Symbol.for('AuthModule'),
	AuthService: Symbol.for('AuthService'),
	AuthApi: Symbol.for('AuthApi'),

	// Member
	MemberModule: Symbol.for('MemberModule'),
	MemberService: Symbol.for('MemberService'),
	MemberApi: Symbol.for('MemberApi')
};
