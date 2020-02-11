module.exports = {
  name: 'ui-gard-data-display',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/gard/data-display',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
