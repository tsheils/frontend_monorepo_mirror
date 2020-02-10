module.exports = {
  name: 'common-data-access-neo4j-connector',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/common/data-access/neo4j-connector',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
