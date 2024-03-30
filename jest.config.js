'use strict';

module.exports = {
	collectCoverage: true,
	testPathIgnorePatterns: ['node_modules'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	}
};
