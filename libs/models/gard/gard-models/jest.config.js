module.exports = {
  name: 'models-gard-gard-models',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/models/gard/gard-models',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
