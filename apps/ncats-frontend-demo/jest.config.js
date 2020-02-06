module.exports = {
  name: 'ncats-frontend-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ncats-frontend-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
