/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const request = chai.request(require('../../src/app'));

describe('User Deletion', () => {
  it('Should warn if a user does not exist', (done) => {
    request.del('/users/999999999999999')
      .end((err, res) => {
        err.should.not.be.null;
        res.should.have.status(404);
        done();
      });
  });

  it('Should delete a valid user', (done) => {
    const user = {
      email: 'bob4@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };
    request.post('/users')
      .send(user)
      .then((res) => {
        request.del(`/users/${res.body.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});
