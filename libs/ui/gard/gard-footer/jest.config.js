module.exports = {
  name: 'ui-gard-gard-footer',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/gard/gard-footer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
