const Backend = jest.genMockFromModule('../Backend');

let _expectedUri = 'set this';
let _responseBody = {};

Backend.init = function(uri, responseBody) {
    _expectedUri = uri;
    _responseBody = responseBody;
};

Backend.doGet = function(uri, done) {
    expect('GET ' + uri).toBe(_expectedUri);
    done(null, _responseBody);
};
Backend.doPost = function(uri, data, done) {
    expect('POST ' + uri).toBe(_expectedUri);
    done(null, _responseBody);
};
Backend.doDelete = function(uri, done) {
     expect('DELETE ' + uri).toBe(_expectedUri);
     done(null, _responseBody);
 };

module.exports = Backend;
