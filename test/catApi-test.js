var sinon = require('sinon');
var assert = require('should');
var proxyquire = require('proxyquire')

describe('Cat Api', function() {
  var catApi;
  var stub = sinon.stub();

  before(function(done) {
    catApi = proxyquire('../app/services/catApi.js', { 'request': stub });
    catApi.getCat = function(cb) { cb(null, '<catHtml/>') };
    done();
  });

  it('should call catApi and get data returned', function(done) {
    catApi.getCat( function(err, body) {
      body.should.eql('<catHtml/>');
      done();
    });
  })
});
