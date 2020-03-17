module.exports = {
  name: 'features-gard-curation-mapper',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/features/gard-curation/mapper',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
