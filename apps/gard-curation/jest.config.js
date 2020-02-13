module.exports = {
  name: 'gard-curation',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/gard-curation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
