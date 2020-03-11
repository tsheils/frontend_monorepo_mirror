module.exports = {
  name: 'sidenavs-facet-sidepanel',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/sidenavs/facet-sidepanel',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
