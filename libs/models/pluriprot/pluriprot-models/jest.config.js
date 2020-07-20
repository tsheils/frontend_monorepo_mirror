module.exports = {
  name: 'models-pluriprot-pluriprot-models',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/models/pluriprot/pluriprot-models',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
