module.exports = {
  name: 'models-core-core-models',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/models/core/core-models',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
