const config = {
  // testEnvironment: 'jsdom',
  verbose: true,
  forceExit: true,
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};

module.exports = config;
