/* eslint-disable no-unused-expressions */
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
      .end((err, res) => {
        err.should.not.be.null;
        res.should.have.status(400);
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
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });

  it('Should return a valid user', (done) => {
    const user = {
      email: 'bob2@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };
    const userKeys = [
      'id',
      'email',
      'forename',
      'surname',
      'created'
    ];
    request.post('/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.all.keys(userKeys);
        res.body.email.should.eql(user.email);
        res.body.forename.should.eql(user.forename);
        res.body.surname.should.eql(user.surname);
        done(err);
      });
  });

  it('Should ignore extra attributes', (done) => {
    const expandedUser = {
      email: 'bob3@example.com',
      forename: 'Bob',
      surname: 'Bobson',
      likes: [
        'cats'
      ]
    };
    request.post('/users')
      .send(expandedUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.not.have.keys('likes');
        done(err);
      });
  });

  it('Should ignore users with a duplicate email', (done) => {
    const user = {
      email: 'bob@example.com',
      forename: 'Bob',
      surname: 'Bobson'
    };
    request.post('/users')
      .send(user)
      .end((err, res) => {
        err.should.not.be.null;
        res.should.have.status(400);
        done();
      });
  });
});
