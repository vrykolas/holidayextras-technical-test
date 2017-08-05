const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const request = chai.request(require('../../src/app'));

describe('User Creation', () => {
  it('Should reject an invalid user', (done) => {
    const user = {
      email: 'bob',
      forename: 'Bob',
      surname: 'Bobson'
    };
    request.post('/users')
      .send(user)
      .then((res) => {
        done(new Error('Invalid response'));
      })
      .catch(() => {
        done();
      });
  });

  it('Should accept a valid user', (done) => {
    const user = {
      email: 'bob@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };
    request.post('/users')
      .send(user)
      .then((res) => {
        res.should.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should return a valid user', (done) => {
    const expandedUser = {
      email: 'bob@example.com',
      forename: 'Bob',
      surname: 'Bobson',
      likes: [
        'cats'
      ]
    };
    const user = {
      email: 'bob@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };
    request.post('/users')
      .send(expandedUser)
      .then((res) => {
        res.body.should.eql(user);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
