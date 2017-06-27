var sinon = require('sinon');

var readFile = require('../routes/log/readFile');

describe("Routes Log", function() {
  describe("POST with not exists file", function() {
    it("should respond with error", function() {
      var req,res,spy;

      req = {body: {filename: 'not exists file'}};
      res = {};
      spy = res.render = sinon.spy();

      readFile(req, res);

      sinon.assert.calledWith(spy, 'components/table', { error: "File not found" });
    });
  })

  describe("POST with exists file", function() {
    it("should respond with result", function() {
      var req,res,spy,fs;
      fs = require('fs');
      req = {body: {filename: 'long.log'}};
      res = {};
      spy = res.render = sinon.spy();

      result = { data: "1 line of log",
                 page: 1,
                 per_page: 10,
                 pagination: { min_page: 1,
                               max_page: 1,
                               prev: 1,
                               next: 1,
                               current_page: 1
                             }
               };

      read = sinon.stub(fs, 'readFile').returns(spy, 'components/table', result);

      readFile(req, res);

      sinon.assert.calledWith(read, 'log/long.log', 'utf8');
    });
  });
});
