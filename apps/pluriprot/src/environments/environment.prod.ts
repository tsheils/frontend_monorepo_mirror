export const environment = {
  production: true,
  dataUrls: [
    {
      origin: 'nscs',
      url: './assets/data/2.5x_up_in_nscs.json' // expression
    },
    {
      origin: 'escs',
      url: './assets/data/2.5x_up_in_escs.json' //expression
    },
    {
      origin: 'nsc-only',
      url: './assets/data/NSC_only.json' // phosphorylation
    },
    {
      origin: 'esc-only',
      url: './assets/data/ESC_only.json' // phosphorylation
    }

  ],
};
