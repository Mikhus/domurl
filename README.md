jsurl
=====

Lightweight URL manipulation with JavaScript

Goal
====

To have a convenient way working with URLs in JavaScript. From time to time there are usual tasks 
when it is required to add or remove some parameters to some basic URL or change some other URL
parts.

There is no easy standard way to do it in JavaScript.

This small library intended to fix that problem

How To Use
==========

First of all it is required to include Url class on the page. It can be simply done as

    <script src="https://raw.github.com/Mikhus/jsurl/master/url.min.js"></script>

Then any time it's required to do some work over the URL string, it's just required to
instantiate the Url object and work with that object instead of initial string. See API
description below to get a clue.

API
===

Methods:

*Url( strURL)*
Constructor. If strURL is not passed curent document URL will be used.

*toString()*
Converts URL to string representation. As far as it's spesial method, any time string
operations is performed over Url objects this method is automatically called

Properties:

*protocol* - protocol part of URL, everything between the beginning of the URL string 
and "://" delimiter

*host* - host name

*port* - port number

*path* - document path

*query* - QueryString object. It's a simple Javascript object with automatic string
mapping. String representation contains everything after "?" and to the end of QueryString

*hash* - Anchor part of the URL. Everything after "#" and to the end of anchor

Usage Examples
==============

```javascript
var u  = new Url; // curent document URL will be used
// or we can instantiate as
var u2 = new Url( "http://example.com/some/path?a=b&c=d#someAnchor");
// it should support relative URLs also
var u3 = new Url( "/my/site/doc/path?foo=bar#baz");

u.query.a = [1, 2, 3]; // adds/replaces in query string params a=1&a=2&a=3
u.query.b = 'woohoo';  // adds/replaces in query string param b=woohoo

alert(u); // alerts string representation of modified URL

if (u.query.a instanceof Array) { // the way to add a parameter
  u.query.a.push(4); // now it's "a=1&a=2&a=3&a=4&b=woohoo"
}

else { // if not an array but scalar value here is a way how to convert to array
  u.query.a = [u.query.a];
  u.query.a.push(8)
}

u.path = '/some/new/path'; // the way to change URL path
u.protocol = 'https' // the way to force https protocol on the source URL

// inject into string
var str = '<a href="' + u + '">My Cool Link</a>';

// or use in DOM context
var a = document.createElement('a');
a.href = u;
a.innerHTML = 'test';
document.body.appendChild( a)
```

License
=======

This code is available under MIT license. Feel free to do what you want.
