module.exports = {
  name: 'idg-tdl-indicator',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/idg-tdl-indicator',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
