// eslint-disable-next-line import/no-extraneous-dependencies
const seeder = require('mongoose-seed');
const bcrypt = require('bcrypt');
const config = require('../../config/index');

seeder.connect(config.db, () => {
  seeder.loadModels([
    `${__dirname}/../models/user.model.js`,
  ]);
  seeder.clearModels(['User'], () => {
    // eslint-disable-next-line no-use-before-define
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'User',
    documents: [
      {
        email: 'super@super.com',
        password: bcrypt.hashSync('super', 10),
        firstName: 'sansajn',
        lastName: 'mudrinic',
      },
      {
        email: 'symphony@super.com',
        password: bcrypt.hashSync('symphony', 10),
        firstName: 'symphony',
        lastName: 'symphony',
      },
      {
        email: 'test@super.com',
        password: bcrypt.hashSync('test123', 10),
        firstName: 'test',
        lastName: 'test',
      },
    ],
  },
];
