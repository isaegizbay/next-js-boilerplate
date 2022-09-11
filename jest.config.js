module.exports = {
	moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
	setupFilesAfterEnv: [
		'<rootDir>/jest/setup.ts',
		'<rootDir>/jest/nullOrAny.ts'
	],
	transform: {
		'^.+\\.ts$': 'ts-jest',
		'^.+\\.js$': 'babel-jest'
	},
	moduleDirectories: ['node_modules', __dirname],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/components/**/*.vue',
		'<rootDir>/pages/**/*.vue'
	]
};
