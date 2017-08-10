var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
var bcrypt = require('bcrypt-nodejs')
var models = require('../../server/models');
var ctrl = require('../../server/controllers/users');

var res;

describe('Server controller tests', function () {
  before(function () {
    return models.sequelize
    .sync({ force: true })
    .then(function () {
      models.User.bulkCreate([
        { first_name: 'User1', last_name: 'LAST1', email: 'test1@test1.com', password: bcrypt.hashSync("12testing!", bcrypt.genSaltSync(8), null), admin: true, createdAt: new Date(), updatedAt: new Date() },
        { first_name: 'User2', last_name: 'LAST2', email: 'test2@test2.com', password: bcrypt.hashSync("12testing!", bcrypt.genSaltSync(8), null), admin: false, createdAt: new Date(), updatedAt: new Date()}
      ]);
    });
  });

  beforeEach(function () {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
  });

  describe('User tests', function () {
    it('Should create a new User', function (done) {
      var req = httpMocks.createRequest({
        body: { first_name: 'User3', last_name: 'LAST3', email: 'test3@test3.com', password: '12testing!', admin: true, createdAt: new Date(), updatedAt: new Date()}
      });

      ctrl.create(req, res);
      res.on('end', function () {
        var response = JSON.parse(res._getData());
        expect(response.success).to.equal(true);
        expect(response.user.first_name).to.equal('User3');
        done();
      });
    });

    it('Should validate unique email adresses', function (done) {
      var req = httpMocks.createRequest({
        body: { first_name: 'User3', last_name: 'LAST3', email: 'test3@test3.com', password: '12testing!', admin: true, createdAt: new Date(), updatedAt: new Date()}
      });

      ctrl.create(req, res);
      res.on('end', function (err) {
        var response = JSON.parse(res._getData())
         expect(res.statusCode).to.equal(422);
         expect(response[0].message).to.equal('Email is already taken!')
         done();
      });
    });

    // it('Should fetch a', function (done) {
    //   req = httpMocks.createRequest();
    //   ctrl.index(req, res);
    //   res.on('end', function () {
    //     var response = JSON.parse(res._getData());
    //     expect(res.statusCode).to.equal(200);
    //     expect(response.length).to.be.above(0);
    //     done();
    //   });
    // });

    // it('Should fetch author by ID', function (done) {
    //   req = httpMocks.createRequest({
    //     params: { id: 1 }
    //   });
    //   ctrl.show(req, res);
    //   res.on('end', function () {
    //     var response = JSON.parse(res._getData());
    //     expect(res.statusCode).to.equal(200);
    //     expect(response.name).to.equal('Test author 1');
    //     done()
    //   });
    // });

    // it('Should update an author', function (done) {
    //   req = httpMocks.createRequest({
    //     params: { id: 1 },
    //     body: { name: 'Updated name', bio: 'Updated Bio' }
    //   });

    //   ctrl.update(req, res);
    //   res.on('end', function () {
    //     models.Author.findById(1)
    //       .then(function (result) {
    //         var updatedAuthor = result.get({ plain: true });
    //         expect(updatedAuthor.name).to.equal('Updated name');
    //         expect(updatedAuthor.bio).to.equal('Updated Bio');
    //       });
    //       done();
    //   });
    // });

    // it('Should delete an author by ID', function (done) {
    //   req = httpMocks.createRequest({
    //     params: { id: 1 }
    //   });

    //   ctrl.delete(req, res);
    //   res.on('end', function () {
    //     //Ensure that the author does not exist.
    //     models.Author.findById(1)
    //       .then(function (response) {
    //         expect(response).to.equal(null);
    //       });
    //     done();
    //   });
    // });
  });
});