// eslint-disable-next-line import/no-extraneous-dependencies
const seeder = require('mongoose-seed');
const config = require('../../config/index');

seeder.connect(config.db, () => {
  seeder.loadModels([
    `${__dirname}/../models/category.model.js`,
  ]);
  seeder.clearModels(['Category'], () => {
    // eslint-disable-next-line no-use-before-define
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'Category',
    documents: [
      {
        categoryName: 'Sport',
      },
      {
        categoryName: 'Food',
      },
      {
        categoryName: 'Movie',
      },
      {
        categoryName: 'Shoes',
      },
    ],
  },
];
