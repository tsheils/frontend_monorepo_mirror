module.exports = {
  name: 'ncats-frontend-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ncats-frontend-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
