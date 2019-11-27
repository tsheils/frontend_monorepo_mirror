module.exports = {
  name: 'dynamic-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dynamic-app',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
