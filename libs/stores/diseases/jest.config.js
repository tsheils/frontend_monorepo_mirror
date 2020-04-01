module.exports = {
  name: 'stores-diseases',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stores/diseases',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
