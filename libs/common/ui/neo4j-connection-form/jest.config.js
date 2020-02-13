module.exports = {
  name: 'common-ui-neo4j-connection-form',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/common/ui/neo4j-connection-form',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
