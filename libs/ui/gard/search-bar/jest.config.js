module.exports = {
  name: 'ui-gard-search-bar',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/gard/search-bar',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
