/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const request = chai.request(require('../../src/app'));

describe('User Update', () => {
  it('Should return not found if a user does not exist', (done) => {
    const user = {
      email: 'bob6@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };

    request.put('/users/999999999999999')
      .send(user)
      .end((err, res) => {
        err.should.not.be.null;
        res.should.have.status(404);
        done();
      });
  });

  it('Should update a valid user', (done) => {
    const user = {
      email: 'bob7@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };

    const updatedUser = {
      email: 'tom@example.com',
      forename: 'Tom',
      surname: 'Tomson'
    };

    let userId;

    request.post('/users')
      .send(user)
      .then((res) => {
        userId = res.body.id;
        return request.put(`/users/${userId}`).send(updatedUser);
      })
      .then(() => {
        request.get(`/users/${userId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.email.should.eql(updatedUser.email);
            res.body.forename.should.eql(updatedUser.forename);
            res.body.surname.should.eql(updatedUser.surname);
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Should be unable to update a user to a duplicate email', (done) => {
    const user1 = {
      email: 'bob8@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };
    const user2 = {
      email: 'bob9@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };

    request.post('/users')
      .send(user1)
      .then((res) => {
        return request.post('/users').send(user2);
      })
      .then((res) => {
        request.put(`/users/${res.body.id}`)
          .send(user1)
          .end((err, res) => {
            err.should.not.be.null;
            res.should.have.status(400);
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});
