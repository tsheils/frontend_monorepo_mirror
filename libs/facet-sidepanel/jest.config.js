module.exports = {
  name: 'facet-sidepanel',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/facet-sidepanel',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
