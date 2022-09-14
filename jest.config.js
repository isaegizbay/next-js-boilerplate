// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './'
});

const config = {
	setupFilesAfterEnv: [
		'<rootDir>/jest/setup.ts',
		'<rootDir>/jest/nullOrAny.ts'
	],
	testEnvironment: 'jest-environment-jsdom',
	moduleDirectories: ['node_modules', __dirname],
	coverageDirectory: '<rootDir>/jest/coverage/',
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/app/**/*.ts',
		'<rootDir>/app/**/*.tsx',
		'!<rootDir>/app/**/*.locale.ts',
		'!<rootDir>/app/**/constants/*',
		'!<rootDir>/app/**/enums/*',
		'!<rootDir>/app/**/types/*',
		'!<rootDir>/app/storage/*',
		'!<rootDir>/**/index.ts',
		'<rootDir>/components/**/*.tsx',
		'<rootDir>/pages/**/*.tsx'
	]
};

module.exports = createJestConfig(config);
