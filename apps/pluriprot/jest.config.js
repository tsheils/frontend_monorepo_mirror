module.exports = {
  name: 'pluriprot',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pluriprot',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
