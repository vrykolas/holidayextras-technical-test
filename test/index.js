const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const request = chai.request(require('../src/app'));

describe('API Server', () => {
  it('Should connect to the API Server', (done) => {
    request.get('/')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
