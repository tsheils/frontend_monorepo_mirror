module.exports = {
  name: 'shared-visualizations-xyplot',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/visualizations/xyplot',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
