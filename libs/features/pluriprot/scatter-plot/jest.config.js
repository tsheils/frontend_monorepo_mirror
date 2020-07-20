module.exports = {
  name: 'features-pluriprot-scatter-plot',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/features/pluriprot/scatter-plot',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
