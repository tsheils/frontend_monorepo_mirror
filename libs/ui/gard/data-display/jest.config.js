module.exports = {
  name: 'ui-gard-data-display',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/gard/data-display',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
