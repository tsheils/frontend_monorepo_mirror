module.exports = {
  name: 'ui-pluriprot-pluriprot-filter-menu',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/ui/pluriprot/pluriprot-filter-menu',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
