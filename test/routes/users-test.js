process.env.NODE_ENV = 'test';

const request = require('supertest');
const express = require('express');

const server = express();

describe('GET /', function() {
  it('respond 200 OK', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /users', function() {
  it('respond with html', function(done) {
    request(server)
      .get('/users')
      .expect(404, function (err) {
        if (err) throw err;
        done();
      });
  });

  it('should respond with all users', function(done) {
    request(server)
      .get('users')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});

