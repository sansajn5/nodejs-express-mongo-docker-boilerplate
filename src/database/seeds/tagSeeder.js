// eslint-disable-next-line import/no-extraneous-dependencies
const seeder = require('mongoose-seed');
const config = require('../../config/index');

seeder.connect(config.db, () => {
  seeder.loadModels([
    `${__dirname}/../models/tag.model.js`,
  ]);
  seeder.clearModels(['Tag'], () => {
    // eslint-disable-next-line no-use-before-define
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'Tag',
    documents: [
      {
        name: 'foodporn',
      },
      {
        name: 'goal',
      },
      {
        name: 'romance',
      },
      {
        name: 'oscar',
      },
    ],
  },
];
