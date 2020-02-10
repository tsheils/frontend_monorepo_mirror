module.exports = {
  name: 'sidenavs-curation-sidepanel',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/sidenavs/curation-sidepanel',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
