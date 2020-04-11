export const environment = {
  production: false,
  neo4j: [
    {
      name: 'gard-data',
      url: 'wss://gard-dev.ncats.io:1338'
    },
    {
      name: 'raw-data',
      url: 'wss://gard-dev-neo4j.ncats.io:1338'
    },
/*    {
      name: 'gard-data',
      url: 'ws://localhost:1338'
    }*/
  ]
};
