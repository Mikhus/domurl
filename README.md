# domurl 2.1 (former jsurl) 
[![Build Status](https://travis-ci.org/Mikhus/domurl.svg?branch=master)](https://travis-ci.org/Mikhus/domurl) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Mikhus/domurl/master/LICENSE)

Lightweight URL manipulation with JavaScript for both DOM and server JavaScript.

## Goal

To have a convenient way working with URLs in JavaScript. From time to time there are usual tasks 
when it is required to add or remove some parameters to some basic URL or change some other URL
parts.

There is no easy standard way to do it in JavaScript.

This small library intended to fix that problem

## Supported Browsers

This library was tested under:
 - IE 7+
 - Chrome 25+
 - Opera 12.15+
 - Firefox 20+
 - Android browser 2.3+
 - NodeJS 0.10+

Theoretically it should work fine with newer or older versions of these browsers, but
it was not fully tested yet. If you'll find any compatibility issues, please, let me know by
leaving a bug report here: https://github.com/Mikhus/domurl/issues

You can run basic tests for your browser here: https://rawgit.com/Mikhus/domurl/master/test/url.html or
run test.html from this repository locally. If any test has not been passed, please,
open a bug report as described above providing browser and OS version on each test
which has been failed.

## How To Use

First of all it is required to include Url class on the page. It can be simply done as

    <script src="url.min.js"></script>

Then any time it's required to do some work over the URL string, it's just required to
instantiate the Url object and work with that object instead of initial string. See API
description below to get a clue.

## Install with JAM

It is possible also to install domurl via JAM repository (http://jamjs.org/).
Could be simply done as:

    $ jam install domurl

## Install with Bower

It is also possible now to install domurl using Bower package repository.
Could be done simply as:

    $ bower install domurl
    
## Install with NPM

Domurl is available on NPM and is now works well for both server and browser:

    $ npm install domurl

## API

### Methods:

**Url({string} [url], {boolean} [noTransform]) -> {Url}**

Constructor. If url argument is not passed, current document URL will be used.
If second argument bypassed as true value it will try to do no transforms
on a given source URL to keep it form as it was initially given. Otherwise,
by default, it will try to resolve given URL to an absolute form.

**Url.toString() -> {string}**

Converts URL to string representation. As far as it's special method, any time string
operations is performed over Url objects this method is automatically called

**Url.paths({Array} [pathStrings])**

Returns Url.path representation as array or sets it via array representation
if optional array of pathStrings was provided.

**Url.encode({string} urlPart) -> {string}**

Performs URI-compatible encoding of the given urlPart component. It works **not**
the same as native encodeURIComponent()!

**Url.decode({string} encUrlPart) -> {string}**

Performs decoding of URI-encoded component. It works **not** the same as native
decodeURIComponent()!

**Url.clearQuery() -> {Url}**

Removes all query string parameters from the URL

**Url.queryLength() -> {Number}**

Returns total count of the query string parameters.

**Url.isEmptyQuery() -> {boolean}**

Returns true if query string contains no parameters, false otherwise.

### Properties:

**Url.protocol** - protocol part of URL, everything between the beginning of the URL string 
and "://" delimiter (if specified)

**Url.user** - auth user name (if specified)

**Url.pass** - auth user password (if specified)

**Url.host** - host name (if specified)

**Url.port** - port number (if specified)

**Url.path** - document path

**Url.query** - QueryString object. It's a simple Javascript object with automatic string
mapping. String representation contains everything after "?" and to the end of QueryString

**Url.hash** - Anchor part of the URL. Everything after "#" and to the end of anchor

## Usage Examples

```javascript
var u  = new Url; // curent document URL will be used
// or we can instantiate as
var u2 = new Url( "http://example.com/some/path?a=b&c=d#someAnchor");
// it should support relative URLs also
var u3 = new Url( "/my/site/doc/path?foo=bar#baz");

// get the value of some query string parameter
alert( u2.query.a);
// or
alert( u3.query["foo"]);

// Manupulating query string parameters
u.query.a = [1, 2, 3]; // adds/replaces in query string params a=1&a=2&a=3
u.query.b = 'woohoo';  // adds/replaces in query string param b=woohoo

if (u.query.a instanceof Array) { // the way to add a parameter
  u.query.a.push(4); // now it's "a=1&a=2&a=3&a=4&b=woohoo"
}

else { // if not an array but scalar value here is a way how to convert to array
  u.query.a = [u.query.a];
  u.query.a.push(8)
}

// The way to remove the parameter:
delete u.query.a
// or:
delete u.query["a"]

// If you need to remove all query string params:
u.clearQuery();
alert( u);

// Lookup URL parts:
alert(
    'protocol = ' + u.protocol + '\n' +
    'user = ' + u.user + '\n' +
    'pass = ' + u.pass + '\n' +
    'host = ' + u.host + '\n' +
    'port = ' + u.port + '\n' +
    'path = ' + u.path + '\n' +
    'query = ' + u.query + '\n' +
    'hash = ' + u.hash
);

// Manipulating URL parts
u.path = '/some/new/path'; // the way to change URL path
console.log(u.paths());
u.paths(['some', 'new', 'path']); // change path by array of strings
console.log(u.path);
u.protocol = 'https' // the way to force https protocol on the source URL

// inject into string
var str = '<a href="' + u + '">My Cool Link</a>';

// or use in DOM context
var a = document.createElement('a');
a.href = u;
a.innerHTML = 'test';
document.body.appendChild( a);

// Stringify
u += '';
String(u);
u.toString();
// NOTE, that usually it will be done automatically, so only in special
//       cases direct stringify is required
```

## License

This code is available under MIT license. Feel free to do what you want.
