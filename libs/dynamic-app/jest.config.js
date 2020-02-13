module.exports = {
  name: 'dynamic-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dynamic-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
