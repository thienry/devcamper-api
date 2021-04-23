module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/__tests__/**/*.js'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '.(js|jsx|tx|tsx)': '@sucrase/jest-plugin'
  }
}
