/** @type {import('@jest/types').Config.InitialOptions} */
export const config: any = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['setupJest.ts'],
    testPathIgnorePatterns: [
        '../node_modules/',
        '../dist/',
        'app/components/template/*'
    ],
    moduleNameMapper: {
      "lodash-es": "lodash",
    },
    globals: {
        'ts-jest': {
            tsconfig: '../tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html$',
            enableTsDiagnostics: true,
            diagnostics: {
                ignoreCodes: [151001]
            }
        }
    },
    restoreMocks: true,
    clearMocks: true
}
