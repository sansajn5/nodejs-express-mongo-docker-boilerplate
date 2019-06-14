const chai = require('chai');

const { expect } = chai;

const { User } = require('../../../database/models');

describe('auth service', () => {
  describe('register method', () => {
    // eslint-disable-next-line global-require
    const { register } = require('../../../api/auth/auth.service');
    it('should create user', async () => {
      jest.spyOn(User.prototype, 'save')
        .mockImplementationOnce(() => Promise.resolve({
          email: 'mudrinic5n@test.com',
          password: 'strongPassword',
        }));
      const response = await register({
        email: 'mudrinic5n@test.com',
        name: 'Nemanja',
      });
      expect(response.email).to.be.equal('mudrinic5n@test.com');
      expect(response.password).to.be.equal('strongPassword');
    });
  });
});
