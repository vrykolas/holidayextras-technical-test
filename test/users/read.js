/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const request = chai.request(require('../../src/app'));

describe('User Read', () => {
  const userKeys = [
    'id',
    'email',
    'forename',
    'surname',
    'created'
  ];

  it('Should return an array of users', (done) => {
    request.get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an.instanceof(Array);
        res.body.forEach((user) => {
          user.should.have.all.keys(userKeys);
        });
        done(err);
      });
  });

  it('Should return a specific user', (done) => {
    const user = {
      email: 'bob5@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };
    let newUser;
    request.post('/users')
      .send(user)
      .then((res) => {
        newUser = res.body;
        request.get(`/users/${res.body.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.eql(newUser);
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should return not found for an invalid user', (done) => {
    request.get(`/users/99999999`)
      .end((err, res) => {
        err.should.not.be.null;
        res.should.have.status(404);
        done();
      });
  });
});
