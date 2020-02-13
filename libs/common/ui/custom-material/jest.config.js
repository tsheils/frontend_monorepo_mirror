module.exports = {
  name: 'common-ui-custom-material',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common/ui/custom-material',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
