module.exports = {
  name: 'ncats-firebase-auth-module',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ncats-firebase-auth-module',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
