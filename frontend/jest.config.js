const config = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = config;
