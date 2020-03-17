module.exports = {
  name: 'gard-data-hub',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/gard-data-hub',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
