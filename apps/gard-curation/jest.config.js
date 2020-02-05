module.exports = {
  name: 'gard-curation',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/gard-curation',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
