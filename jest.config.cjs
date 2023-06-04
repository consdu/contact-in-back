/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/utils/loadEnvironments/loadEnvironments.ts",
    "!src/utils/connectToDatabase/connectToDatabase.ts",
    "!src/mocks/errors/validationErrorMock.ts",
  ],
};
