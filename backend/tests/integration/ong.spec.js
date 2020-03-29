const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD3",
	      email: "contato@apad.com.br",
	      whatsapp: "0000000000",
	      city: "Curitiba",
	      uf: "PR"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  afterAll(async () => {
    await connection.destroy();
  });

});