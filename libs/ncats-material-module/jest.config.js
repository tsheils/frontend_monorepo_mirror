module.exports = {
  name: 'ncats-material-module',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ncats-material-module',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
