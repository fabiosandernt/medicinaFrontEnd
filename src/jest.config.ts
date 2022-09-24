/** @type {import('@jest/types').Config.InitialOptions} */
export const config: any = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/'
    ],
    moduleNameMapper: {
      "lodash-es": "lodash",
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/src/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html$',
            diagnostics: {
            ignoreCodes: [151001]
            }
        }
    },
    restoreMocks: true,
    clearMocks: true
}
