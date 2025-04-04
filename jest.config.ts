/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

import type { Config } from 'jest'

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(payload)/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@payload-config$': '<rootDir>/src/payload.config.ts',
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"]
}

export default createJestConfig(config)
