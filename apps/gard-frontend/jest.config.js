module.exports = {
  name: 'gard-frontend',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/gard-frontend',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
