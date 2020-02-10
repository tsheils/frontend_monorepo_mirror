module.exports = {
  name: 'sidenavs-navigation-sidepanel',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/sidenavs/navigation-sidepanel',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
