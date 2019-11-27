module.exports = {
  name: 'idg-tdl-indicator',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/idg-tdl-indicator',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
