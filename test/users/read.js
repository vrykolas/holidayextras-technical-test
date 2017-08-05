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
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an.instanceof(Array);
        res.body.forEach((user) => {
          user.should.have.all.keys(userKeys);
        });
        done();
      })
      .catch((err) => {
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
        return request.get(`/users/${res.body.id}`);
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.eql(newUser);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
