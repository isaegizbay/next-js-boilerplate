// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './'
});

const config = {
	setupFilesAfterEnv: [
		'<rootDir>/src/jest/setup.ts',
		'<rootDir>/src/jest/nullOrAny.ts'
	],
	testEnvironment: 'jest-environment-jsdom',
	moduleDirectories: ['node_modules', __dirname],
	moduleNameMapper: {
		'@app/(.*)': ['<rootDir>/src/app/$1'],
		'@styles/(.*)': ['<rootDir>/src/styles/$1']
	},
	coverageDirectory: '<rootDir>/src/jest/coverage/',
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/app/**/*.ts',
		'<rootDir>/src/app/**/*.tsx',
		'!<rootDir>/src/app/**/*.locale.ts',
		'!<rootDir>/src/app/**/constants/*',
		'!<rootDir>/src/app/**/enums/*',
		'!<rootDir>/src/app/**/types/*',
		'!<rootDir>/src/app/storage/*',
		'!<rootDir>/src/**/index.ts',
		'<rootDir>/src/components/**/*.tsx',
		'<rootDir>/src/pages/**/*.tsx'
	]
};

module.exports = createJestConfig(config);
