module.exports = {
  name: 'stores-filters',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stores/filters',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
