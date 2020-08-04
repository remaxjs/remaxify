module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.test\\.tsx?$',
  testPathIgnorePatterns: ['/lib/'],
  coveragePathIgnorePatterns: ['src/__tests__'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
