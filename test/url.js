var assert = require('assert');
var Url = require('../url.min.js');
var fs = require('fs');
var p = require('path');

describe('Url()', function () {
    it('should construct an oobject', function () {
        var u = new Url();
        assert.equal(u instanceof Url, true);
    });
    it('should match current dir when construct with no argument', function () {
        var u = new Url();
        var dir = u.path.replace(/\//g, p.sep);
        process.platform.match(/^win/) && (dir = dir.substr(1));
        assert.equal(dir, fs.realpathSync('.'));
    });
    it('should match the given argument url', function () {
        var u = new Url('url.min.js');
        var path = u.path.replace(/\//g, p.sep);
        process.platform.match(/^win/) && (path = path.substr(1));
        assert.equal(path, fs.realpathSync('.') + p.sep + 'url.min.js');
    });
});

describe('Url.clearQuery()', function () {
    it('should remove all vars from query string', function () {
        var url = new Url('http://example.com/?a=&b=&c=&d=&e=&f=&g=&h#foo');
        url.clearQuery();
        assert.equal('http://example.com/#foo', url.toString());
    });
});

describe('Url.encode(), Url.decode()', function () {
    it('should correctly encode and decode query string params', function () {
        var url1 = new Url('http://localhost/?a=%3F').toString();
        var url2 = new Url('http://localhost/?a=%3f').toString();
        assert.equal(url1.toLowerCase(), url2.toLowerCase());
    });
});

describe('Url props interface', function () {
    it('should parse all URL parts correctly', function () {
        var str = 'wss://user:pass@example.com:9999/some/path.html?foo=bar#anchor';
        var u = new Url(str);
        assert.equal(u.protocol, 'wss');
        assert.equal(u.user, 'user');
        assert.equal(u.pass, 'pass');
        assert.equal(u.host, 'example.com');
        assert.equal(u.port, '9999');
        assert.equal(u.path, '/some/path.html');
        assert.equal(u.query, 'foo=bar');
        assert.equal(u.query.foo, 'bar');
        assert.equal(u.hash, 'anchor');
        assert.equal(str, u.toString());
    });
});