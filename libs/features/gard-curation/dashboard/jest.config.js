module.exports = {
  name: 'features-gard-curation-dashboard',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/features/gard-curation/dashboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
